import { fetchBillTextVersions, BillTextResponse } from './congress-api';
import { getNews } from './you-com';
import OpenAI from "openai";
import { ScoredPineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";
import { getLLMPrompt } from "./prompt-loader";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default async function getBillWithOpenAI(
    bills: ScoredPineconeRecord<RecordMetadata>[],
    billType: "s" | "h",
    userQuery: string
) {

    const billTexts = [];
    for (const bill of bills) {
      const congressNumber: string = bill.metadata!['congress-number'].toString();
      const billNumber: string = bill.metadata!['bill-number'].toString();
      const billTextData: string = await fetchBillTextVersions(congressNumber, billType, billNumber);
      billTextData|| 'No bill text available';
      billTexts.push(billTextData);
    }

    const combinedBillText = billTexts.map((text, index) => `--- Bill ${index + 1} ---\n\n${text}`).join('\n\n');
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
  return completion.choices[0]
}
