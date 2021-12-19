/*
  Warnings:

  - You are about to drop the column `resultId` on the `UserTest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserTest" DROP COLUMN "resultId",
ADD COLUMN     "marks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalMarks" INTEGER NOT NULL DEFAULT 0;
