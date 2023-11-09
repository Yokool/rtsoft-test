import React, { useState } from "react";
import './AddTaskModal.css';
import { Task } from "../TaskTypes/Task.tsx";

type AddTaskModalProps = {
    setTaskList: (taskList: Task[]) => void;
}

export function AddTaskModal({setTaskList}: AddTaskModalProps): React.JSX.Element {
    
    
    const [taskCode, setTaskCode] = useState('');
    const [taskName, setTaskName] = useState('');

    function handleTaskCodeChange(event: React.FormEvent<HTMLInputElement>) {
        const newTaskCode = event.currentTarget.value;
        setTaskCode(newTaskCode);
    }

    function handleTaskNameChange(event: React.FormEvent<HTMLInputElement>) {
        const newTaskName = event.currentTarget.value;
        setTaskName(newTaskName);
    }
    
    return (
        <div className="modalDarkBackground">
            <div className="center">
                <div className="modalContainer">
                    <h1>Kód zakázky</h1>
                    <input
                        className="modalText"
                        type="text"
                        value={taskCode}
                        onChange={handleTaskCodeChange}
                    />
                    <h1>Název zakázky</h1>
                    <input
                        className="modalText"
                        type="text"
                        value={taskName}
                        onChange={handleTaskNameChange}
                    />
                    <button className="modalSubmit">
                        Přidat
                    </button>
                </div>
            </div>
        </div>
    );
}

