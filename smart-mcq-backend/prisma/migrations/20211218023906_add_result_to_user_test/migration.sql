-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "closed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserTest" ADD COLUMN     "marks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0;
