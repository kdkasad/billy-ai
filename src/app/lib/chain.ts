import OpenAI from "openai"
import { Message } from "../data/data";
import { getContext } from "./context-loader";

const openai = new OpenAI();

export async function getBill(user: string, messages: Message[]) {
    const messageArray = messages.map((m) => m.message);
    console.log(`Generating bill for ${user}`)
    const context = await getContext(messageArray);
    console.log(`Generating LLM prompt with context`);
    const prompt = await getPrompt(context);
    console.log("Prompting LLM...")
    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: prompt},
        ],
        model: 'gpt-3.5-turbo',
    })
    return completion.choices[0].message.content;
}