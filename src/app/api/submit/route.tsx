"use server";

import { getBill } from "@/app/lib/chain";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../auth/[...nextauth]/config";
import prisma from "@/lib/prisma";
// import { createOpenAI } from "@ai-sdk/openai";
// import { getLLMResponse } from "@/lib/llm";

// const openai = createOpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const model = openai("gpt-3.5-turbo")

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const session = await getServerSession(authConfig);
  if (!session || !session.user?.id) {
    // FIXME: Return 401
    throw new Error("Missing session and/or user.");
  }

  try {
    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(" "));

        const { messages } = await request.json();
        const response = await getBill(session.user!.id, messages);
        console.log("getBill() returns:", response);
        const dbEntry = await prisma.billPost.create({
          data: {
            summary: response.summary,
            fullContents: response.content,
            user: { connect: { id: session.user!.id } },
            contentUrl: "",
            title: response.title,
          },
          select: {
            id: true,
          },
        });
        console.log("Bill added to database, id =", dbEntry.id);

        controller.enqueue(
          encoder.encode(JSON.stringify({ postId: dbEntry.id }))
        );
        controller.close();
      },
    });
    return new Response(readableStream, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error: POST request for highlighted text explanation");
  }
}
