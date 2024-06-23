import { NextRequest, NextResponse } from "next/server";
import { getBill } from "@/app/lib/chain"
// import { createOpenAI } from "@ai-sdk/openai";
// import { getLLMResponse } from "@/lib/llm";
export const dynamic = 'force-dynamic' // defaults to auto

// const openai = createOpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const model = openai("gpt-3.5-turbo")

  
export async function POST(request: NextRequest) {
    try { 
        const { user, messages } = await request.json();
        const response = getBill(user, messages);
        return NextResponse.json(response);
    }
    catch (error) {
        console.error(error)
        throw new Error("Error: POST request for highlighted text explanation");
    }
}