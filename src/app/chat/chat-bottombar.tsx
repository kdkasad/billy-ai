import {
    FileImage,
    Mic,
    Paperclip,
    PlusCircle,
    SendHorizontal,
    Smile,
    ThumbsUp,
  } from "lucide-react";
  import Link from "next/link";
  import React, { useRef, useState } from "react";
//   import { buttonVariants } from "../ui/button";
  import { Button } from "@/components/ui/button"
  import { cn } from "@/lib/utils";
  import { AnimatePresence, motion } from "framer-motion";
  import { Message, loggedInUserData } from "@/app/data/data";
  import { Textarea } from "./textarea";
//   import { EmojiPicker } from "../emoji-picker";
  import { Popover, PopoverContent, PopoverTrigger } from "./popover";
  
  interface ChatBottombarProps {
    sendMessage: (newMessage: Message) => void;
    isMobile: boolean;
  }
  
  export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];
  
  export default function ChatBottombar({
    sendMessage, isMobile,
  }: ChatBottombarProps) {
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
  
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(event.target.value);
    };
  
    const handleThumbsUp = () => {
      const newMessage: Message = {
        id: message.length + 1,
        name: loggedInUserData.name,
        avatar: loggedInUserData.avatar,
        message: "👍",
      };
      sendMessage(newMessage);
      setMessage("");
    };
  
    const handleSend = () => {
      if (message.trim()) {
        const newMessage: Message = {
          id: message.length + 1,
          name: loggedInUserData.name,
          avatar: loggedInUserData.avatar,
          message: message.trim(),
        };
        sendMessage(newMessage);
        setMessage("");
  
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };
  
    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
  
      if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault();
        setMessage((prev) => prev + "\n");
      }
    };
  
    return (
      <div className="p-2 flex justify-between w-full items-center gap-2">
        <AnimatePresence initial={false}>
          <motion.div
            key="input"
            className="w-full relative"
            layout
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              opacity: { duration: 0.05 },
              layout: {
                type: "spring",
                bounce: 0.15,
              },
            }}
          >
            <Textarea
              autoComplete="off"
              value={message}
              ref={inputRef}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              name="message"
              placeholder="Aa"
              className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
            ></Textarea>
            <div className="absolute right-2 bottom-0.5  ">
              {/* <EmojiPicker onChange={(value) => {
                setMessage(message + value)
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }} /> */}
            </div>
          </motion.div>
  
          {(
            <Link
              href="#"
              className={cn(
                // buttonVariants({ variant: "ghost", size: "icon" }),
                "hover:bg-accent/30 hover:text-accent-foreground",
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0 flex justify-center items-center -ml-1"
              )}
              onClick={handleSend}
            >
              <SendHorizontal className="text-muted-foreground" />
            </Link>
          )}
        </AnimatePresence>
      </div>
    );
  }