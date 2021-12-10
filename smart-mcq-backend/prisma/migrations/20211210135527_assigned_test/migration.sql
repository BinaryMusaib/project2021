-- CreateTable
CREATE TABLE "AssignedTest" (
    "id" SERIAL NOT NULL,
    "testId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AssignedTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssignedTest_id_userId_key" ON "AssignedTest"("id", "userId");

-- AddForeignKey
ALTER TABLE "AssignedTest" ADD CONSTRAINT "AssignedTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedTest" ADD CONSTRAINT "AssignedTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
