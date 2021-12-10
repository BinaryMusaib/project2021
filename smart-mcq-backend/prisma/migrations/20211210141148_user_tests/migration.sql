/*
  Warnings:

  - You are about to drop the `AssignedTest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExamineeQuestionTest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssignedTest" DROP CONSTRAINT "AssignedTest_testId_fkey";

-- DropForeignKey
ALTER TABLE "AssignedTest" DROP CONSTRAINT "AssignedTest_userId_fkey";

-- DropForeignKey
ALTER TABLE "ExamineeQuestionTest" DROP CONSTRAINT "ExamineeQuestionTest_answerId_fkey";

-- DropForeignKey
ALTER TABLE "ExamineeQuestionTest" DROP CONSTRAINT "ExamineeQuestionTest_questionId_fkey";

-- DropForeignKey
ALTER TABLE "ExamineeQuestionTest" DROP CONSTRAINT "ExamineeQuestionTest_testId_fkey";

-- DropForeignKey
ALTER TABLE "ExamineeQuestionTest" DROP CONSTRAINT "ExamineeQuestionTest_userId_fkey";

-- DropTable
DROP TABLE "AssignedTest";

-- DropTable
DROP TABLE "ExamineeQuestionTest";

-- CreateTable
CREATE TABLE "UserTest" (
    "id" SERIAL NOT NULL,
    "testId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerSheet" (
    "id" SERIAL NOT NULL,
    "userTestId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnswerSheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTest_id_userId_key" ON "UserTest"("id", "userId");

-- AddForeignKey
ALTER TABLE "UserTest" ADD CONSTRAINT "UserTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTest" ADD CONSTRAINT "UserTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerSheet" ADD CONSTRAINT "AnswerSheet_userTestId_fkey" FOREIGN KEY ("userTestId") REFERENCES "UserTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerSheet" ADD CONSTRAINT "AnswerSheet_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerSheet" ADD CONSTRAINT "AnswerSheet_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
