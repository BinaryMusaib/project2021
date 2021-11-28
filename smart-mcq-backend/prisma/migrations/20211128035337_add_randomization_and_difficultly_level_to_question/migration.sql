-- CreateEnum
CREATE TYPE "QuestionLevel" AS ENUM ('Easy', 'Medium', 'Difficult', 'Expert');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "level" "QuestionLevel" NOT NULL DEFAULT E'Easy',
ADD COLUMN     "randomize" BOOLEAN NOT NULL DEFAULT true;
