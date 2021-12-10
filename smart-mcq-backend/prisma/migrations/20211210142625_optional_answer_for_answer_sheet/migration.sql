-- DropForeignKey
ALTER TABLE "AnswerSheet" DROP CONSTRAINT "AnswerSheet_answerId_fkey";

-- AlterTable
ALTER TABLE "AnswerSheet" ALTER COLUMN "answerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AnswerSheet" ADD CONSTRAINT "AnswerSheet_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Option"("id") ON DELETE SET NULL ON UPDATE CASCADE;
