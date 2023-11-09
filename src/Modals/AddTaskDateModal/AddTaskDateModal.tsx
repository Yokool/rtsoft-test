import React, { useContext, useState } from "react";
import { Task } from "../../TaskTypes/Task.tsx";
import { ModalBase } from "../ModalBase.tsx";
import { ModalHeaderDate, ModalHeaderSelect, ModalSubmit } from "../ModalElements.tsx";
import { TaskFulfillmentDispatchContext, TaskFulfillmentValues, TaskFulfillmentValuesDisplay } from "../../TaskFulfillment/TaskFulfillment.tsx";

type AddTaskModalProps = {
    shownTask: Task
    setShownTask: (newValue: Task | undefined) => void
    startingDate: Date // starting date is controlled from the parent
    setStartingDate: (newDate: Date) => void
}


export function AddTaskDateModal({
    shownTask,
    setShownTask,
    startingDate,
    setStartingDate
}: AddTaskModalProps): React.JSX.Element {
    
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const dispatchTaskFulfillment = useContext(TaskFulfillmentDispatchContext);

    function handleTaskSubmit() {

        // This should be handled by a modal
        // that stops the submitting from even
        // happening.
        if(endDate === undefined)
        {
            throw new Error("This code block should not be reached. endDate was undefined. This should be handled by the modal.");
        }

        dispatchTaskFulfillment({
            type: 'add',
            addedTask: {
                task: shownTask,
                startDate: startingDate,
                endDate: endDate,
                status: 'waiting' // TODO: ADD STATUS
            }
        });

        // Hide the modal by unassigning
        // the shown task.
        setShownTask(undefined);


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
            <ModalHeaderSelect
                headerText="Status"
                options={Object.values(TaskFulfillmentValuesDisplay)}
            />
            <ModalSubmit
                submitText="Přidat plnění zakázky"
                onSubmit={handleTaskSubmit}
            />
        </ModalBase>
    );
}

