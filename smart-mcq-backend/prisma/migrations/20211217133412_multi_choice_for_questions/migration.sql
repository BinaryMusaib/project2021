-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "index" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "multi" BOOLEAN NOT NULL DEFAULT false;
