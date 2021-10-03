import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import EditableSpan from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";

export type TaskPropsTypeTest = {
    todoListId: string
    taskID: string
}

export const Task = React.memo((props: TaskPropsTypeTest) => {

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todoListId].filter(
        el => el.id === props.taskID
    )[0])
    const dispatch = useDispatch()

    const removeTask = () => dispatch(removeTaskAC(props.taskID, props.todoListId))
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeTaskStatusAC(props.taskID, e.currentTarget.checked, props.todoListId))
    const changeTaskTitle = useCallback((title: string) => dispatch(changeTaskTitleAC(props.taskID, title, props.taskID)), [props.taskID, props.taskID, dispatch])

    return <div>
        <li className={task.isDone ? "is-done" : ""}>

            <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeTaskStatus}
            />
            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
            <IconButton size={"small"} onClick={removeTask}><Delete/></IconButton>
            {/*<button onClick={removeTask}>X</button>*/}
        </li>
    </div>
})