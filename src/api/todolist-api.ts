import axios from "axios";

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
}