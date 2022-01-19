import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {log} from "util";
import {Simulate} from "react-dom/test-utils";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const addTask = () => {

        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle("")
        } else {
            setError("Title is requared")
        }
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            addTask()
        }
    }


    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return <div>
        <h3>{props.title}</h3>
        <button onClick={removeTodolist}>x</button>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />

            <button onClick={addTask}>+
            </button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }


                    return <li key={t.id}>
                        <input className={t.isDone ? "is-done" : ""} type="checkbox" onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })

            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

export default Todolist;