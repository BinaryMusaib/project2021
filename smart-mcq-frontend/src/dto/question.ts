
export interface CreateSubjectDto {
    title: string
    description: string
}

export interface SubjectDto extends CreateSubjectDto {
    id: number
}

export interface CreateTopicDto {
    title: string
    description: string
    subjectId: number
}

export interface TopicDto extends CreateTopicDto {
    id: number
}

export interface CreateQuestionDto {
    text: string
    options: CreateOptionDto[];
    topics: number[];
    randomize: boolean;
    level: QuestionLevel;
}

export interface CreateOptionDto {
    text: string
    isCorrect: boolean
}

export interface UpdateQuestionDto {
    text: string
    options: UpdateOptionDto[];
    topics: number[];
    randomize: boolean;
    level: QuestionLevel;
}

export interface UpdateOptionDto extends CreateOptionDto {
    id?: number
}

export interface OptionDto extends CreateOptionDto {
    id: number;
}

export type QuestionLevel = "Easy" | "Medium" | "Difficult" | "Expert";

export interface QuestionDto {
    id: number;
    text: string;
    options: OptionDto[];
    topics: TopicDto[];
    randomize: boolean;
    level: QuestionLevel;
}

export interface CreatePaperTopicDto {
    topicId: number;
    level: QuestionLevel;
    numberOfQuestions: number;
}

export interface PaperTopicDto extends CreatePaperTopicDto {
    id: number;
}

export interface CreateQuestionPaperDto {
    title: string;
    paperTopics: CreatePaperTopicDto[];
    duration: number;
}

export interface QuestionPaperDto {
    id: number;
    title: string;
    duration: number;
    paperTopics: PaperTopicDto[]
}

export interface UpdateQuestionPaperDto extends CreateQuestionPaperDto {
    paperTopics: UpdatePaperTopicDto[];
}

export interface UpdatePaperTopicDto extends CreatePaperTopicDto {
    id?: number
}

export interface CreateExamineeListDto {
    title: string
    description: string
    examinees: ExamineesDto[]
}

export interface ExamineeListDto extends CreateExamineeListDto {
    id: number;
}

export interface CreateExamineesDto {
    email: string;
}

export interface ExamineesDto extends CreateExamineesDto {
}

export interface CreateTestDto {
    title: string
    startTime: Date
    endTime: Date
    paperId: number
    listId: number
}

export interface UpdateTestDto {
    title: string
    startTime: Date
    endTime: Date
}

export interface TestDto extends CreateTestDto {
    id: number;
}

export interface UserTestDto {
    id: number;
    userId: number;
    test: TestDto;
    startTime?: Date
    endTime?: Date
}

export interface SetAnswerDto {
    answerSheetId: number;
    optionId: number;
}
