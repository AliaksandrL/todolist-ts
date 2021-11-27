import axios from "axios";


const settings = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'ae3793e8-7c42-49d3-82ac-f60f84efebfe'
    }
})


export const api = {
    getTodolists() {
        return settings.get<TodoType[]>('/todo-lists')
    },
    createTodolists(title: string) {
        return settings.post<CommonResponseType<{ item: TodoType }>>('/todo-lists', {title})
    },
    deleteTodolists(todolistId: string) {
        return settings.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolists(todolistId: string, title: string) {
        return settings.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return settings.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type CommonResponseType<T = {}> = {
    fieldsErrors: Array<string>
    resultCode: number
    messages: Array<string>
    data: T
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}