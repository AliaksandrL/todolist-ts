import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onKeyPressAddMode = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            offEditMode()
        }
    }

    return (
        editMode
            ? <input
                onChange={changeTitle}
                value={title}
                onBlur={offEditMode}
                onKeyPress={onKeyPressAddMode}
                autoFocus
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan;