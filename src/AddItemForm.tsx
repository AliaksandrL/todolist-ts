import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(event.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addItem()
        }
    }
    const userMsg = error ? <div style={{color: "red"}}>Title is required!</div> : null

    return (
        <div>
            <input
                className={error ? "error" : ""}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
            />
            <button onClick={addItem}>+</button>
            {userMsg}
        </div>
    )
}

export default AddItemForm;