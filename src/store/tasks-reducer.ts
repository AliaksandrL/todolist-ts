import {TaskStateType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeStatusActionType = {
    type: 'CHANGE-TASK'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK'
    taskId: string
    isDone: boolean
    todolistId: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeStatusActionType

export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.todolistId]: [{id: v1(), title: action.title, isDone: false}]}
        case "CHANGE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId]}
        default:
            throw new Error("")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusActionType => {
    return {type: 'CHANGE-TASK', taskId, isDone, todolistId}
}

