
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
}

export interface CreateOptionDto {
    text: string
    isCorrect: boolean
}

export interface UpdateQuestionDto {
    text: string
    options: UpdateOptionDto[];
    topics: number[];
}

export interface UpdateOptionDto extends CreateOptionDto {
    id?: number
}

export interface OptionDto extends CreateOptionDto {
    id: number;
}

export interface QuestionDto {
    id: number;
    text: string;
    options: OptionDto[];
    topics: TopicDto[];
}
