import React, { useState } from "react";
import './AddTaskModal.css';
import { Task } from "../../TaskTypes/Task";
import { taskListContainsCode } from "../../TaskCalendar";
import { ErrorModalBase } from "../ErrorModal/ErrorModal";
import { ModalHeaderInput } from "../ModalElements/ModalHeaderInput";
import { ModalSubmit } from "../ModalElements/ModalSubmit";

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

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)


    function handleTaskSubmit() {

        // We can't add in new tasks, whose code matches an
        // already existing task -> all task codes are unique
        if(taskListContainsCode(taskList, taskCode))
        {
            setErrorMessage(`Zakázka s kódem \`${taskCode}\` již existuje. Všechny zakázky musí mít unikátní kód.`);
            return;
        }

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
        <ErrorModalBase
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            >
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
        </ErrorModalBase>
    );
}

