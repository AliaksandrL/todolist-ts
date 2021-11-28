import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from "react";
import {FilterValuesType} from "../../../app/App";
import AddItemForm from "../../../AddItemForm";
import EditableSpan from "../../../EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {getTaskThunk} from "../tasks-reducer";
import {useDispatch} from "react-redux";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = React.memo((props: TodoListPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTaskThunk(props.id))
    }, [])

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    let allTodolistTasks = props.tasks;
    let tasksForTodoList = allTodolistTasks;
    if (props.filter === "active") {
        tasksForTodoList = allTodolistTasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodoList = allTodolistTasks.filter(t => t.isDone)
    }

    const setAllFilterValue = useCallback(() => props.changeFilter("all", props.id), [])
    const setActiveFilterValue = useCallback(() => props.changeFilter("active", props.id), [])
    const setCompletedFilterValue = useCallback(() => props.changeFilter("completed", props.id), [])

    const removeTodoList = useCallback(() => props.removeTodoList(props.id), [props.id, props.removeTodoList])
    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.id), [props.id, props.changeTodoListTitle])

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.id, props.removeTask])
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean) => props.changeTaskStatus(taskId, newIsDoneValue, props.id), [props.id, props.changeTaskStatus])
    const changeTaskTitle = useCallback((taskId: string, title: string) => props.changeTaskTitle(taskId, title, props.id), [props.id, props.changeTaskTitle])

    const allBtnClass = props.filter === "all" ? "active-filter" : ""
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const completedBtnClass = props.filter === "completed" ? "active-filter" : ""

    // JSX
    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <IconButton size={"small"} onClick={removeTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>

        <ul style={{padding: "0px", listStyle: "none"}}>

            {
                tasksForTodoList.map(t => {
                    return <Task
                        key={t.id}
                        task={t}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                    />
                })
            }

        </ul>
        <div>
            <Button
                size={"small"}
                variant="outlined"
                color={props.filter === "all" ? "secondary" : "primary"}
                onClick={setAllFilterValue}
                style={{margin: "0 3px"}}
            >All
            </Button>
            <Button
                variant="outlined"
                color={props.filter === "active" ? "secondary" : "primary"}
                size={"small"}
                onClick={setActiveFilterValue}
            >Active
            </Button>
            <Button
                size={"small"}
                variant="outlined"
                color={props.filter === "completed" ? "secondary" : "primary"}
                onClick={setCompletedFilterValue}
            >Completed
            </Button>
        </div>
    </div>
})

export default TodoList;