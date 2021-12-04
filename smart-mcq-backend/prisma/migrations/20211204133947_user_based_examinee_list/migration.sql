/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `ExamineeList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ExamineeList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamineeList" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ExamineeList_id_userId_key" ON "ExamineeList"("id", "userId");

-- AddForeignKey
ALTER TABLE "ExamineeList" ADD CONSTRAINT "ExamineeList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
