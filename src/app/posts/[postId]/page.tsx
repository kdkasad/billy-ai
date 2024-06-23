import prisma from "@/lib/prisma";

export default async function PostPage({ params }: { params: { postId: string } }) {
    const bill = await prisma.billPost.findUnique({
        where: {
            id: parseInt(params.postId)
        },
        select: {
            user: {
                select: {
                    name: true,
                    image: true,
                }
            },
            tag: {
                select: {
                    name: true
                }
            }
        }
    });

    
}