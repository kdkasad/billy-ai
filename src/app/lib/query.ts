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
): Promise<Omit<BillWithAnalysis, 'title' | 'summary'>> {

  const billTextPromises = [];
  bills.map((bill) => { })
  for (const bill of bills) {
    const congressNumber: string = bill.metadata!['congress-number'].toString();
    const billNumber: string = bill.metadata!['bill-number'].toString();
    const billTextData: Promise<string> = fetchBillTextVersions(congressNumber, billType, billNumber)
      .then((billTextData) => billTextData || 'No bill text available');
    billTextPromises.push(billTextData);
  }
  const [currentEvents, ...billTexts] = await Promise.all([getNews(userQuery), ...billTextPromises]);

  const combinedBillText = billTexts.map((text, index) => `--- Begin bill ${index + 1} ---\n\n${text}\n\n--- End bill ${index + 1} ---`).join('\n\n');

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
      { role: "user", content: prompt }
    ],
    model: 'gpt-3.5-turbo'
  })
  console.log("INSIDE THE GETBILLWITHOPENAI FUNCTION")
  //console.log(completion.choices[0].message)
  //console.log(completion.choices[0].message.content)
  const ratingAnalyzed = await analyzeText(completion.choices[0].message.content as string)

  const ratingStartIndex = ratingAnalyzed.indexOf('Rating: ') + 'Rating: '.length;
  const ratingVal = ratingAnalyzed.substring(ratingStartIndex);

  if (!completion.choices[0].message.content) {
    throw new Error('No response from AI');
  }

  return {
    content: completion.choices[0].message.content,
    rating: ratingVal
  };
}
