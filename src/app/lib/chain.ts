import OpenAI from "openai"
import { Message } from "../data/data";
import { synthesize, getExistingBills } from "./context-loader";
import generateBillWithOpenAI from "@/app/lib/query";
// import { getLLMPrompt } from "./prompt-loader";

const openai = new OpenAI();

export async function getBill(user: string, messages: Message[]) {
    console.log(`init: Generating bill for ${user}`)
    console.log(`Synthesizing user responses...`)
    const synthesis = await synthesize(messages)
    console.log(synthesis)
    const existing_bills = await getExistingBills(synthesis.message.content!, process.env.PINECONE_NAMESPACE!); 
    console.log(existing_bills[0].metadata)
    const response = await generateBillWithOpenAI(existing_bills, "s", synthesis.message.content!)
    .then((r) => r.message.content)
    // console.log(`Generating LLM prompt with context`);
    // const prompt = await getLLMPrompt(context);
    // console.log("Prompting LLM...")
    // const completion = await openai.chat.completions.create({
    //     messages: [
    //         {role: 'system', content: prompt},
    //     ],
    //     model: 'gpt-3.5-turbo',
    // })
    // return completion.choices[0].message.content;
}