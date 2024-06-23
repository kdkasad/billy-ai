-- DropForeignKey
ALTER TABLE "bill_posts" DROP CONSTRAINT "bill_posts_tag_id_fkey";

-- AlterTable
ALTER TABLE "bill_posts" ALTER COLUMN "tag_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "bill_posts" ADD CONSTRAINT "bill_posts_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;
