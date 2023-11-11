import React, { useContext, useState } from "react";
import { Task } from "../../TaskTypes/Task.tsx";
import { ModalHeaderDate, ModalHeaderSelect, ModalSubmit } from "../ModalElements.tsx";
import { TaskFulfillmentDispatchContext, TaskFulfillmentStatus, TaskFulfillmentValuesDisplay, turnTaskFulfillmentDisplayIntoKey } from "../../TaskFulfillment/TaskFulfillment.tsx";
import { ErrorModalBase } from "../ErrorModal/ErrorModal.tsx";
import { getKeyForValue } from "../../GeneralUtils/GeneralUtils.tsx";

type AddTaskModalProps = {
    shownTask: Task
    setShownTask: (newValue: Task | undefined) => void
    startingDate: Date | undefined // starting date is controlled from the parent
    setStartingDate: (newDate: Date | undefined) => void
}


export function AddTaskDateModal({
    shownTask,
    setShownTask,
    startingDate,
    setStartingDate
}: AddTaskModalProps): React.JSX.Element {
    
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const dispatchTaskFulfillment = useContext(TaskFulfillmentDispatchContext);

    const [shownErrorMessage, setShownErrorMessage] = useState<string | undefined>(undefined);
    
    const [status, setStatus] = useState<TaskFulfillmentStatus>('waiting');

    const noStartDateErrorMessage = "Prosím vyplňte datum počátku zakázky.";
    const noEndDateErrorMessage = "Prosím vyplňte datum ukončení zakázky.";
    
    function handleTaskSubmit() {

        if(startingDate === undefined)
        {
            setShownErrorMessage(noStartDateErrorMessage);
            return;
        }

        if(endDate === undefined)
        {
            // show error modal on unfilled date
            setShownErrorMessage(noEndDateErrorMessage);
            return;
        }

        dispatchTaskFulfillment({
            type: 'add',
            addedTask: {
                task: shownTask,
                startDate: startingDate,
                endDate: endDate,
                status: status // TODO: ADD STATUS
            }
        });

        // Hide the modal by unassigning
        // the shown task.
        setShownTask(undefined);


    }

    const statusValues = Object.values(TaskFulfillmentValuesDisplay);

    return (
        <ErrorModalBase
            errorMessage={shownErrorMessage}
            setErrorMessage={setShownErrorMessage}
        >
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
                options={statusValues}
                onChange={(newValue) => {
                    // Exhaustive check -> this really
                    // shouldn't happen unless we passed
                    // something different to options={}
                    if(!statusValues.includes(newValue))
                    {
                        throw new Error(`${newValue} is not contained within the keys of ${statusValues}.`);
                    }

                    const displayValueIntoStatusKey = turnTaskFulfillmentDisplayIntoKey(newValue);
                    

                    // this is ok thanks to the check
                    const newValueStatus = displayValueIntoStatusKey as TaskFulfillmentStatus;
                    setStatus(newValueStatus);

                }}
            />
            <ModalSubmit
                submitText="Přidat plnění zakázky"
                onSubmit={handleTaskSubmit}
            />
        </ErrorModalBase>
    );
}

