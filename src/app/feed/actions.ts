'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteVoteAction = async (voteId: number) => {
    "use server";
    await prisma.vote.delete({
        where: {
            id: voteId,
        },
    });
    revalidatePath("/feed");
};

export const createVoteAction = async (data: {
    type: "UP" | "DOWN";
    postId: number;
    userId: string;
}) => {
    "use server";
    await prisma.vote.create({
        data,
    });
    revalidatePath("/feed");
};
