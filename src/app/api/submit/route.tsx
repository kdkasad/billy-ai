"use server";

import { getBill } from "@/app/lib/chain";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../auth/[...nextauth]/config";
// import { createOpenAI } from "@ai-sdk/openai";
// import { getLLMResponse } from "@/lib/llm";

// const openai = createOpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const model = openai("gpt-3.5-turbo")

export async function POST(request: NextRequest) {
  const session = await getServerSession(authConfig);
  if (!session || !session.user?.id) {
    // FIXME: Return 401
    throw new Error("Missing session and/or user.");
  }

  try {
    const { messages } = await request.json();
    const response = await getBill(session.user.id, messages);
    console.log("getBill() returns:", response);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    throw new Error("Error: POST request for highlighted text explanation");
  }
}
