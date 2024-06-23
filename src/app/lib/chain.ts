'use server';

import { getBillWithOpenAI } from "@/app/lib/query";
import { Message } from "../data/data";
import { getExistingBills, synthesize } from "./context-loader";
// import { getLLMPrompt } from "./prompt-loader";

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

    const userResponses = messages.filter(m => m.name !== "system");
    const title: string = userResponses[userResponses.length - 1].message;

    return {
        ...generatedBill,
        summary: synthesis,
        title
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
