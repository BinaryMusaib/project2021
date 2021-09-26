-- CreateTable
CREATE TABLE "Subject" (
    "subjectId" SERIAL NOT NULL,
    "subjectName" VARCHAR(255) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subjectId")
);

-- CreateTable
CREATE TABLE "Topic" (
    "topicId" SERIAL NOT NULL,
    "topicName" VARCHAR(255) NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("topicId")
);

-- CreateTable
CREATE TABLE "SubTopic" (
    "subtopicId" SERIAL NOT NULL,
    "subtopicName" VARCHAR(255) NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "SubTopic_pkey" PRIMARY KEY ("subtopicId")
);

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTopic" ADD CONSTRAINT "SubTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("topicId") ON DELETE RESTRICT ON UPDATE CASCADE;
