"use client"
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { userData } from "@/app/data/data";
import Link from "next/link";
import { Chat } from "./chat"


export default function Home() {
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);

  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
      <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
        <Chat
            messages={selectedUser.messages}
            selectedUser={selectedUser}
            isMobile={false}
        />
      </div>

    </main>
  );
}