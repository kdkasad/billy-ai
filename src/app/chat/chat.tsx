"use client";

import { ChatList } from "@/app/chat/chat-list";
import { Message, systemQuestions } from "@/app/data/data";
import { readSync } from "fs";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React from "react";

interface ChatProps {
  messages?: Message[];
  currentUser: Session["user"];
  isMobile: boolean;
}

export function Chat({ messages, currentUser, isMobile }: ChatProps) {
  const router = useRouter();
  const [systemMessageIndex, setSystemMessageIndex] = React.useState(1);
  const [messagesState, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      avatar: "system",
      name: "system",
      message: systemQuestions[0].question,
    },
    {
      id: 1,
      avatar: "system",
      name: "system",
      message: systemQuestions[0].example,
    },
  ]);
  const [submitted, setSubmitted] = React.useState(false);

  const sendMessage = async (newMessage: Message) => {
    const sysQ: Message[] =
      systemMessageIndex < systemQuestions.length
        ? [
            {
              id: 1,
              avatar: "system",
              name: "system",
              message: systemQuestions[systemMessageIndex].question,
            },
            {
              id: 2,
              avatar: "system",
              name: "system",
              message: systemQuestions[systemMessageIndex].example,
            },
          ]
        : [];
    const newMessages = [...messagesState, newMessage, ...sysQ];
    setMessages(newMessages);
    setSystemMessageIndex((prevIndex) => prevIndex + 1);

    // Triggers on conversation finish
    if (systemMessageIndex >= systemQuestions.length && !submitted) {
      setSubmitted(true);
      const thankYouMessages: Message[] = [
        {
          id: 3,
          avatar: "system",
          name: "system",
          message: "Thank you for your input!",
        },
        {
          id: 3,
          avatar: "system",
          name: "system",
          message:
            "Generating your bill... Please be patient, as this can take up to a minute.",
        },
        {
          id: 3,
          avatar: "system",
          name: "system",
          message:
            "You will be automatically redirected to your new bill once it's ready.",
        },
      ];
      setMessages((prevMessages) => [...prevMessages, ...thankYouMessages]);
      console.log({ messagesState });

      fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          const postId = responseData.postId;
          router.push(`/posts/${postId}`);
        });
    }
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatList
        messages={messagesState}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
