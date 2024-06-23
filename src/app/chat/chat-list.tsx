"use client";

import { Message } from "@/app/data/data";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
// import { Avatar, AvatarImage } from "../ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import ChatBottombar from "./chat-bottombar";

interface ChatListProps {
  messages?: Message[];
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export function ChatList({ messages, sendMessage, isMobile }: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.name === "system" ? "items-start" : "items-end"
              )}
            >
              <div className="flex gap-3 items-center">
                <span className=" bg-accent p-3 rounded-md max-w-xs">
                  {message.message}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
