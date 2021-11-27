import React, {useEffect, useState} from 'react'
import {api} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        api.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "newTodolistSasha";
        api.createTodolists(title)
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'fb5216a3-f3cb-4198-8b32-be0a1dcbcc78';
        api.deleteTodolists(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e607c621-ef8b-4f68-a3ad-24bdc7bb9a64';
        const title = "Sasha";
        api.updateTodolists(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}