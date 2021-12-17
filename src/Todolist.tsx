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
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState<string | null>(null)



    const addTask = () => {

        if (newTaskTitle.trim() !== "" ) {
            props.addTask(newTaskTitle.trim())
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
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }



    const onAllClickHandler = () => {props.changeFilter("all")}
    const onActiveClickHandler = () => {props.changeFilter("active")}
    const onCompletedClickHandler = () => {props.changeFilter("completed")}
   

        return <div>
        <h3>{props.title}</h3>
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

                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {

                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }
                    
                    
                    


                    return <li key={t.id}>
                        <input className={t.isDone ? "is-done" : ""} type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })

            }
        </ul>
        <div>
            <button className={props.filter  === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter  === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter  === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}

export default Todolist;