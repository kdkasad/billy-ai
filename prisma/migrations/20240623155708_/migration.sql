/*
  Warnings:

  - Added the required column `full_contents` to the `bill_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bill_posts" ADD COLUMN     "full_contents" TEXT NOT NULL;
