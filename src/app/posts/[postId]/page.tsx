import { authConfig } from "@/app/api/auth/[...nextauth]/config";
import PostVoteTicker from "@/components/post-vote-ticker";
import prisma from "@/lib/prisma";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/api/auth/login?next=/post/" + params.postId);
  }

  const bill = await prisma.billPost.findUniqueOrThrow({
    where: {
      id: parseInt(params.postId),
    },
    select: {
      id: true,
      title: true,
      summary: true,
      postDate: true,
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

  const myVoteEntry = bill.votes.find(
    (vote) => vote.userId === session.user!.id
  );
  const myVote = myVoteEntry
    ? { id: myVoteEntry.id, type: myVoteEntry.type }
    : undefined;
  const voteCount = bill?.votes
    .map((vote) => (vote.type === "UP" ? 1 : -1))
    .reduce((a, b) => a + b, 0);

  return (
    <div className="p-8">
      <div className="flex flex-row gap-4">
        <div className="flex-shrink">
          <PostVoteTicker
            id={bill.id}
            userId={session.user!.id}
            votes={voteCount}
            myVote={myVote}
          />
        </div>
        <div className="py-2">
          <h1 className="text-3xl font-bold">{bill.title}</h1>
          <div className="text-sm text-muted-foreground">
            Posted on {bill.postDate.toLocaleDateString()},{" "}
            {bill.postDate.toLocaleTimeString()}
          </div>
          <div className="mt-6 flex items-center gap-2">
            <Avatar>
              {bill.user.image && <AvatarImage src={bill.user.image} />}
              <AvatarFallback>
                {bill.user.name
                  .split(" ")
                  .slice(2)
                  .map((word) => word[0])}
              </AvatarFallback>
            </Avatar>
            <div>{bill.user.name}</div>
          </div>

          <div className="mt-8 max-w-2xl">{bill.summary}</div>
        </div>
      </div>
    </div>
  );
}
