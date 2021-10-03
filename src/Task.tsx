import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import EditableSpan from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, newTitle: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task')
    const removeTask = () => props.removeTask(props.task.id)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked)
    const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.task.id, title), [props.task.id, props.changeTaskTitle])

    return <div>
        <li className={props.task.isDone ? "is-done" : ""}>

            <input
                type="checkbox"
                checked={props.task.isDone}
                onChange={changeTaskStatus}
            />
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton size={"small"} onClick={removeTask}><Delete/></IconButton>
            {/*<button onClick={removeTask}>X</button>*/}
        </li>
    </div>
})