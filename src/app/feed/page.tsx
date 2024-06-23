import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "../api/auth/[...nextauth]/config";
import PostCard from "./post-card";

export default async function FeedPage({
  searchParams,
}: {
  searchParams?: { rank?: string };
}) {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/feed");
  }

  const rank: string = searchParams?.rank ?? "new";
  let queryOptions;
  if (rank === "new") {
    queryOptions = { orderBy: { postDate: "desc" } };
  } else if (rank === "top") {
    queryOptions = { orderBy: { votes: "desc" } };
  }

  const bills = await prisma.billPost.findMany({
    ...queryOptions,
    select: {
      id: true,
      title: true,
      postDate: true,
      summary: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      tag: {
        select: {
          name: true,
        },
      },
      votes: {
        select: {
          id: true,
          userId: true,
          type: true,
        },
      },
    },
  });

  return (
    <>
      <div className="h-full w-full p-8 pt-4 -ml-1">
        <h1 className="text-2xl font-bold">Feed</h1>
        <div className="mt-8 flex h-full w-full flex-col gap-6">
          {bills.map((bill) => {
            const myVoteEntry = bill.votes.find(
              (vote) => vote.userId === session.user!.id
            );
            const myVote = myVoteEntry
              ? { id: myVoteEntry.id, type: myVoteEntry.type }
              : undefined;
            const voteCount = bill.votes
              .map((vote) => (vote.type === "UP" ? 1 : -1))
              .reduce((a, b) => a + b, 0);
            const props = {
              ...bill,
              myVote,
              votes: voteCount,
              userId: session.user!.id,
            };
            return <PostCard key={bill.id} {...props} />;
          })}
        </div>
      </div>
    </>
  );
}
