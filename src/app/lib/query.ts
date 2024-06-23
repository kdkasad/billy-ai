import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { fetchBillTextVersions, BillTextResponse } from './congress-api';
import { getNews } from './you-com';
import OpenAI from "openai";
import { ScoredPineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";
import { getLLMPrompt } from "./prompt-loader";

const client = new BedrockRuntimeClient({
  region: "us-east-1", // or your preferred region
  credentials: defaultProvider(),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateBillWithBedrock(
  congressList: string[],
  billTypeList: string[],
  billNumberList: string[],
  userQuery: string
) {
  console.log(congressList)
  console.log(billTypeList)
  console.log(billNumberList)
  
  if (congressList.length !== billTypeList.length || billTypeList.length !== billNumberList.length) {
    throw new Error("The lengths of congress, billType, and billNumber lists must be the same");
  }

  const billTexts = await Promise.all(congressList.map(async (congress, index) => {
    const billType = billTypeList[index];
    const billNumber = billNumberList[index];
    const billTextData: string = await fetchBillTextVersions(congress, billType, billNumber);
    return billTextData || 'No bill text available';
  }));

  const combinedBillText = billTexts.map((text, index) => `--- Bill ${index + 1} ---\n\n${text}`).join('\n\n');

  // Fetch the current events using the news topic
  const currentEvents = await getNews(userQuery);

  const context = `
    Existing Legislation:
    ${combinedBillText}

    Current Events:
    ${currentEvents.join('\n\n')}

    User Query: ${userQuery}
  `;

  const input = {
    modelId: "anthropic.claude-3-sonnet-20240229-v1:0", // Use the appropriate model ID
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      prompt: `You are an expert legislative assistant. Your task is to create a new bill based on the following information:

      ${context}

      Using the existing legislation as reference, considering the current events, and addressing the user's query, draft a new bill. The bill should include:

      1. A title for the bill
      2. A preamble or statement of purpose
      3. Main sections of the bill, including definitions if necessary
      4. Key provisions and regulations
      5. Implementation details or timeline, if applicable

      Please format the bill in a clear, structured manner, similar to actual legislative documents. Don't make it that long though. Keep it somewhat medium length. Ensure that the new bill is relevant to the user's query and takes into account the current events provided.`,
      max_tokens: 8000,
      temperature: 0.7,
    }),
  };

  const command = new InvokeModelCommand(input);

  try {
    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    return responseBody.completion;
  } catch (error) {
    console.error("Error generating bill with Bedrock:", error);
    throw error;
  }
}

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
