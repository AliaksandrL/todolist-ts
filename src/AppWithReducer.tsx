import React, {useReducer, useState} from 'react';
import './app/App.css';
import TodoList, {TaskType} from "./features/TodolistsList/Todolist/TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./features/TodolistsList/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todoListsReducer,
} from "./features/TodolistsList/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, dispatchToLists] = useReducer(todoListsReducer,[
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    // console.log(typeof v1())
    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "meat", isDone: false},
        ],
    })

    const removeTask = (taskID: string, todoListId: string) => {
        let action = removeTaskAC(taskID, todoListId)
        dispatchToTasks(action)
        // const todoListTasks = tasks[todoListId]
        // tasks[todoListId] = todoListTasks.filter(t => t.id !== taskID)
        // setTasks({...tasks})
    }
    const addTask = (title: string, todoListId: string) => {
        let action = addTaskAC(title, todoListId)
        dispatchToTasks(action)
        // const newTask: TaskType = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // tasks[todoListId] = [newTask, ...tasks[todoListId]]
        // setTasks({...tasks})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        let action = changeTaskStatusAC(taskID, isDone, todoListId)
        dispatchToTasks(action)
        // tasks[todoListId] = tasks[todoListId].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        // setTasks({...tasks})
    }
    const changeTaskTitle = (taskID: string, newTitle: string, todoListId: string) => {
        let action = changeTaskTitleAC(taskID, newTitle, todoListId)
        dispatchToTasks(action)
        // tasks[todoListId] = tasks[todoListId].map(t => t.id === taskID ? {...t, title: title} : t)
        // setTasks({...tasks})
    }
    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatchToLists(ChangeTodolistFilterAC(todoListId, filter))
        // setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        let action = RemoveTodolistAC(todoListId)
        dispatchToLists(action)
        dispatchToTasks(action)
        // setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        // const copyTasks = {...tasks}
        // delete copyTasks[todoListId]
        // setTasks(copyTasks)
    }
    const addTodoList = (title: string) => {
        dispatchToLists(AddTodolistAC(title))
        // const newTodoListId = v1()
        // setTodoLists([...todoLists, {id: newTodoListId, title, filter: "all"}])
        // setTasks({...tasks, [newTodoListId]: []})
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchToLists(ChangeTodolistTitleAC(title, todoListId))
        // setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
    }


    // GUI (CRUD):
    const todoListsComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: "15px"}}>
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color="inherit"
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
