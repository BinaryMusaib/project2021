/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,userId]` on the table `QuestionPaper` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Question_id_userId_key" ON "Question"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionPaper_id_userId_key" ON "QuestionPaper"("id", "userId");
