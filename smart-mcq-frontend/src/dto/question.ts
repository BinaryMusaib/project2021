
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
    answer: number
    topicId: number
}

export interface QuestionDto extends CreateQuestionDto {
    id: number
}
