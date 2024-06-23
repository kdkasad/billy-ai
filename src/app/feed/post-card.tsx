"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { createVoteAction, deleteVoteAction } from "./actions";

export interface PostCardProps {
  id: number;
  title: string;
  user: {
    name: string;
    image?: string | null;
  };
  summary: string;
  votes: number;
  tag: {
    name: string;
  };
  postDate: Date;
  myVote?: {
    id: number;
    type: "UP" | "DOWN";
  } | null;
  userId: string;
}

export default function PostCard(props: PostCardProps) {
  async function handleVote(vote: "UP" | "DOWN") {
    if (props.myVote?.type === vote) {
      console.log("delete", props.myVote.id);
      await deleteVoteAction(props.myVote.id);
    } else if (props.myVote === null || props.myVote === undefined) {
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
    <div className="p-4 bg-card shadow rounded-xl border flex gap-4">
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
      <div className="space-y-3">
        <div className="text-xl font-bold">{props.title}</div>
        <div className="line-clamp-2">{props.summary}</div>
        <div className="flex items-center gap-2">
          <Avatar>
            {props.user.image && <AvatarImage src={props.user.image} />}
            <AvatarFallback>
              {props.user.name
                .split(" ")
                .slice(2)
                .map((word) => word[0])}
            </AvatarFallback>
          </Avatar>
          <div>{props.user.name}</div>
        </div>
      </div>
    </div>
  );
}
