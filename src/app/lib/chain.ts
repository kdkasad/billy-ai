'use server';

import OpenAI from "openai"
import { Message } from "../data/data";
import { synthesize, getExistingBills } from "./context-loader";
import { getBillWithOpenAI } from "@/app/lib/query";
// import { getLLMPrompt } from "./prompt-loader";

const openai = new OpenAI();

export async function getBill(userId: string, messages: Message[]) {
    console.log(`init: Generating bill for ${userId}`)
    console.log(`Synthesizing user responses...`)
    const synthesis = await synthesize(messages);
    console.log(synthesis)
    console.log("SYNTHESIS DONE")
    const existing_bills = await getExistingBills(synthesis, process.env.PINECONE_NAMESPACE!);
    console.log({ existing_bills })
    const generatedBill = await getBillWithOpenAI(existing_bills, "s", synthesis)
    console.log({ generatedBill });
    return {
        ...generatedBill,
        summary: synthesis
    };
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
