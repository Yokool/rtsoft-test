import React, { useState } from "react";
import './AddTaskModal.css';
import { Task } from "../../TaskTypes/Task";
import { ModalBase } from "../ModalBase";
import { ModalHeaderInput, ModalSubmit } from "../ModalElements";

type AddTaskModalProps = {
    taskList: Task[]
    setTaskList: (taskList: Task[]) => void;
    setShowingModal: (showModal: boolean) => void;
}


export function AddTaskModal({
    taskList,
    setTaskList,
    setShowingModal
}: AddTaskModalProps): React.JSX.Element {
    
    
    const [taskCode, setTaskCode] = useState('');
    const [taskName, setTaskName] = useState('');


    function handleTaskSubmit() {
        setTaskList([
            ...taskList,
            {
                taskCode: taskCode,
                taskName: taskName
            }
        ])
        setShowingModal(false);
    }
    
    return (
        <ModalBase>
            <ModalHeaderInput
                header="Kód zakázky"
                inputValue={taskCode}
                setInputValue={setTaskCode}
            />
            <ModalHeaderInput
                header="Název zakázky"
                inputValue={taskName}
                setInputValue={setTaskName}
            />
            <ModalSubmit
                submitText="Přidat"
                onSubmit={handleTaskSubmit}
            />
        </ModalBase>
    );
}

