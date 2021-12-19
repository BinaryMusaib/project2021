import { UserDto } from "./auth";

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
    multi: boolean;
}

export interface CreateOptionDto {
    text: string
    isCorrect: boolean
    index: number
}

export interface UpdateQuestionDto {
    text: string
    options: UpdateOptionDto[];
    topics: number[];
    randomize: boolean;
    level: QuestionLevel;
    multi: boolean;
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
    multi: boolean;
}

export interface CreatePaperTopicDto {
    topicId: number;
    level: QuestionLevel;
    numberOfQuestions: number;
}

export interface PaperTopicDto extends CreatePaperTopicDto {
    id: number;
    topic?: TopicDto;
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
    closed: boolean;
}

export interface UserTestLightDto {
    id: number;
    userId: number;
    startTime?: Date
    endTime?: Date
    finished: boolean;
    marks: number;
    totalMarks: number;
}

export interface TestUserTestDto extends UserTestLightDto {
    user: UserDto
}

export interface TestDetailsDto extends TestDto {
    userTests: TestUserTestDto[];
}

export interface UserTestDto extends UserTestLightDto {
    test: TestDto;
    sheets: AnswerSheetDto[]
}

export interface UserTestDetailsDto extends UserTestDto {
    test: TestDetailsDto & {
        paper: QuestionPaperDto
    };
    results: ResultDto[]
    user: UserDto
}

export interface UserTestFilterDto {
    startDate: Date,
    endDate: Date
}

export interface SetAnswerDto {
    answerSheetId: number;
    answer: string;
}

export interface AnswerSheetDto {
    id: number;
    question: QuestionDto;
    answer?: string;
    mark: number;
    isCorrect: boolean;
}

export interface ResultDto {
    userTestId: number;
    topicId: number;
    marks: number;
    totalMarks: number
}
