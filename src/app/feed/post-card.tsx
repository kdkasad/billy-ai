"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { createVoteAction, deleteVoteAction } from "./actions";
import PostVoteTicker from "@/components/post-vote-ticker";
import Link from "next/link";

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
  return (
    <div className="p-4 bg-card shadow rounded-xl border flex gap-4">
      <PostVoteTicker
        userId={props.userId}
        myVote={props.myVote}
        id={props.id}
        votes={props.votes}
      />
      <Link href={`/posts/${props.id}`}>
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
      </Link>
    </div>
  );
}
