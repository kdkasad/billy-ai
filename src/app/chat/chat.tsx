import { Message, UserData, systemQuestions } from "@/app/data/data"
// import ChatTopbar from "./chat-topbar";
import { ChatList } from "@/app/chat/chat-list";
import React from "react";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
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
    }
  ]);
  
  React.useEffect(() => {
    if (systemMessageIndex > systemQuestions.length) {
      const thankYouMessage: Message = {
        id: 3,
        avatar: "system",
        name: "system",
        message: "Thank you for your conversation!",
      };
      setMessages((prevMessages) => [...prevMessages, thankYouMessage]);
      const userMessages = messagesState.filter((message) => message.name === "user");
      console.log(messagesState)
      console.log(userMessages)
      fetch("api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: selectedUser.name,
          messages: userMessages,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          throw new Error("Error submitting user form data")
        });
    }
  }, [systemMessageIndex]);

  const sendMessage = (newMessage: Message) => {
    const sysQ: Message[] = systemMessageIndex < systemQuestions.length ? [
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
    }
  ] : []
    setMessages([...messagesState, newMessage, ...sysQ]);
    setSystemMessageIndex(prevIndex => prevIndex + 1);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}