import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}
export type ChangeTodoListAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}
export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListAT | ChangeTodoListFilterAT

const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListId = v1()
            return [...todoLists, {id: newTodoListId, title: action.title, filter: "all"}]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}

export default todoListsReducer;

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", id: id})

export const AddTodoListAC = (title: string): AddTodoListAT => ({type: "ADD-TODOLIST", title: title})
export const ChangeTodoListAC = (title: string, id: string): ChangeTodoListAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    title: title,
    id: id
})
export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    filter,
    id,
})