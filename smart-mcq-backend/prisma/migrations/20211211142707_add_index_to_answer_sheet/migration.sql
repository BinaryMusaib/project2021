/*
  Warnings:

  - A unique constraint covering the columns `[id,userTestId]` on the table `AnswerSheet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AnswerSheet_id_userTestId_key" ON "AnswerSheet"("id", "userTestId");
