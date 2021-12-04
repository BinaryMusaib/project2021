-- CreateTable
CREATE TABLE "ExamineeList" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ExamineeList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExamineeList" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserExamineeList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExamineeList_title_key" ON "ExamineeList"("title");

-- CreateIndex
CREATE UNIQUE INDEX "UserExamineeList_listId_userId_key" ON "UserExamineeList"("listId", "userId");

-- AddForeignKey
ALTER TABLE "UserExamineeList" ADD CONSTRAINT "UserExamineeList_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ExamineeList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExamineeList" ADD CONSTRAINT "UserExamineeList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
