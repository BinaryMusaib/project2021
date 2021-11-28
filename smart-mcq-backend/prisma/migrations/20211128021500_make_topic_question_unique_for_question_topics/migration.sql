/*
  Warnings:

  - A unique constraint covering the columns `[topicId,questionId]` on the table `QuestionTopic` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuestionTopic_topicId_questionId_key" ON "QuestionTopic"("topicId", "questionId");
