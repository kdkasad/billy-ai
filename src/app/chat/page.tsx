import { userData } from "@/app/data/data";
import React from "react";
import { Chat } from "./chat";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/config";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = getServerSession(authConfig).then((session) => {
    if (!session || !session.user) {
      redirect("/signin?next=/chat");
    }
    return session.user;
  });

  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
      <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
        <Chat currentUser={await user} isMobile={false} />
      </div>
    </main>
  );
}
