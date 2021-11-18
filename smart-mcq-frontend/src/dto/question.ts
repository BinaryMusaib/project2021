
export interface CreateSubjectDto {
    title: string
    description: string
}

export interface SubjectDto extends CreateSubjectDto {
    id: number
}

export interface CreateTopicDto {
    title:string
    description:string
}
export interface TopicDto extends CreateTopicDto {
    id: number
}