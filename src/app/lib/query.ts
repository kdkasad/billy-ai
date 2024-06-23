import { fetchBillTextVersions, BillTextResponse } from './congress-api';
import { getNews } from './you-com';
import OpenAI from "openai";
import { ScoredPineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";
import { getLLMPrompt } from "./prompt-loader";
import { analyzeText } from "./claude3-query";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

interface BillWithAnalysis {
  content: any; // Adjust the type of choice based on actual structure
  title: string;
  rating: string;
  summary: string;
}

export async function getBillWithOpenAI(
    bills: ScoredPineconeRecord<RecordMetadata>[],
    billType: "s" | "h",
    userQuery: string
): Promise<Omit<BillWithAnalysis, 'summary'>> {

    const billTexts = [];
    for (const bill of bills) {
      const congressNumber: string = bill.metadata!['congress-number'].toString();
      const billNumber: string = bill.metadata!['bill-number'].toString();
      const billTextData: string = await fetchBillTextVersions(congressNumber, billType, billNumber);
      billTextData|| 'No bill text available';
      billTexts.push(billTextData);
    }

  const combinedBillText = billTexts.map((text, index) => `--- Begin bill ${index + 1} ---\n\n${text}\n\n--- End bill ${index + 1} ---`).join('\n\n');
    const currentEvents = await getNews(userQuery);

    const context = `
    Existing Legislation:
    ${combinedBillText}

    Current Events:
    ${currentEvents.join('\n\n')}

    User Query: ${userQuery}
  `;

  const prompt = getLLMPrompt(context)
  //console.log(prompt)
  const completion = await openai.chat.completions.create({
    messages: [
        {role: "user", content: prompt}
      ],
    model: 'gpt-3.5-turbo'
  })
  console.log("INSIDE THE GETBILLWITHOPENAI FUNCTION")
  //console.log(completion.choices[0].message)
  //console.log(completion.choices[0].message.content)
  const ratingAnalyzed = await analyzeText(completion.choices[0].message.content as string)

  const startIndex = (completion.choices[0].message.content as string).indexOf('\\title{');
  const endIndex = (completion.choices[0].message.content as string).indexOf('}', startIndex);
  const title = (completion.choices[0].message.content as string).substring(startIndex + '\\title{'.length, endIndex).trim();


  const ratingStartIndex = ratingAnalyzed.indexOf('Rating: ') + 'Rating: '.length;
  const ratingVal = ratingAnalyzed.substring(ratingStartIndex);

  if (!completion.choices[0].message.content) {
    throw new Error('No response from AI');
  }

  return {
    content: completion.choices[0].message.content,
    title: title,
    rating: ratingVal
  };
}
