import { getPineconeClient } from "@/app/lib/pinecone-client";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Message } from "../data/data";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { getSynthesisPrompt } from "@/app/lib/prompt-loader"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
}
);

export const synthesize = async (messages: Message[]) => {
  console.log(messages.map((m) => ({role: m.name, content: m.message} as ChatCompletionMessageParam)))
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: getSynthesisPrompt(messages) }
      ],
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
  });
  if (!completion.choices[0].message.content) {
    throw new Error('No response from OpenAI');
  }
  return completion.choices[0].message.content;
}

const getEmbeddings = async (message: string) => {
    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY!,
      model: "text-embedding-3-large",
    });
    const vectors = await embeddings.embedDocuments([message]);
    return vectors[0]
}

const getMatchesFromEmbeddings = async (embeddings: number[], topK: number, namespace: string) => {
    const pineconeClient = await getPineconeClient();
  const index = await pineconeClient.Index(process.env.PINECONE_INDEX_NAME!);
  const pineconeNamespace = index.namespace(namespace)

    try {
      const queryResult = await pineconeNamespace.query({
        vector: embeddings,
        topK,
        includeMetadata: true,
      })
      return queryResult.matches || []
    } catch (e) {
      console.log("Error querying embeddings: ", e)
      throw new Error(`Error querying embeddings: ${e}`)
    }
  }

export const getExistingBills = async (
    message: string,
    namespace: string,
    maxTokens = 3000,
    minScore = 0.2,
    getOnlyText = true
  ) => {
    const embedding = await getEmbeddings(message);
    const matches = await getMatchesFromEmbeddings(embedding, 1, namespace);
    const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore);

    return qualifyingDocs
  };
