/*
  Warnings:

  - You are about to drop the column `answerId` on the `AnswerSheet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnswerSheet" DROP CONSTRAINT "AnswerSheet_answerId_fkey";

-- AlterTable
ALTER TABLE "AnswerSheet" DROP COLUMN "answerId",
ADD COLUMN     "answer" TEXT;
