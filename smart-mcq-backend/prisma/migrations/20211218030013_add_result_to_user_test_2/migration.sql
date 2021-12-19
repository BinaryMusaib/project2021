/*
  Warnings:

  - You are about to drop the column `marks` on the `UserTest` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `UserTest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserTest" DROP COLUMN "marks",
DROP COLUMN "total",
ADD COLUMN     "resultId" INTEGER;

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "userTestId" INTEGER NOT NULL,
    "marks" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_userTestId_fkey" FOREIGN KEY ("userTestId") REFERENCES "UserTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "QuestionPaperTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
