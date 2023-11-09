import React, { useState } from "react";
import { Task } from "../../TaskTypes/Task.tsx";
import { ModalBase } from "../ModalBase.tsx";
import { ModalHeaderDate, ModalSubmit } from "../ModalElements.tsx";

type AddTaskModalProps = {
    shownTask: Task
    startingDate: Date // starting date is controlled from the parent
    setStartingDate: (newDate: Date) => void
}


export function AddTaskDateModal({
    shownTask,
    startingDate,
    setStartingDate
}: AddTaskModalProps): React.JSX.Element {
    
    const [endDate, setEndDate] = useState<Date>();
    
    function handleTaskSubmit() {

    }

    return (
        <ModalBase>
            <h1>Přidávám nové plnění zakázky</h1>
            <h2>{shownTask.taskCode + ' ' + shownTask.taskName}</h2>
            <ModalHeaderDate
                headerText="Počáteční datum"
                date={startingDate}
                setDate={setStartingDate}
            />
            <ModalHeaderDate
                headerText="Konečné datum"
                date={endDate}
                setDate={setEndDate}
            />
            <ModalSubmit
                submitText="Přidat plnění zakázky"
                onSubmit={handleTaskSubmit}
            />
        </ModalBase>
    );
}

