"use client";

import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { createVoteAction, deleteVoteAction } from "@/app/feed/actions";

export default function PostVoteTicker(props: {
  id: number;
  votes: number;
  myVote?: {
    id: number;
    type: "UP" | "DOWN";
  } | null;
  userId: string;
}) {
  async function handleVote(vote: "UP" | "DOWN") {
    if (props.myVote) {
      console.log("delete", props.myVote.id);
      await deleteVoteAction(props.myVote.id);
    }

    if (!props.myVote || props.myVote.type !== vote) {
      console.log("create", {
        type: vote,
        postId: props.id,
        userId: props.userId,
      });
      await createVoteAction({
        type: vote,
        postId: props.id,
        userId: props.userId,
      });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Button variant="ghost" onClick={() => handleVote("UP")}>
        <ArrowUp
          className={cn(
            "size-6 text-muted-foreground/50",
            props.myVote?.type === "UP" && "text-red-700"
          )}
        />
      </Button>
      <div>{props.votes}</div>
      <Button variant="ghost" onClick={() => handleVote("DOWN")}>
        <ArrowDown
          className={cn(
            "size-6 text-muted-foreground/50",
            props.myVote?.type === "DOWN" && "text-red-700"
          )}
        />
      </Button>
    </div>
  );
}
