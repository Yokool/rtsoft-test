import { useState } from "react"
import { TaskFulfillmentStatus, TaskFulfillmentValuesDisplay, turnTaskFulfillmentDisplayIntoKey } from "../../TaskFulfillment/TaskFulfillment"
import { Task } from "../../TaskTypes/Task"
import { ErrorModalBase } from "../ErrorModal/ErrorModal"
import { ModalHeaderDate, ModalHeaderSelect, ModalSubmit } from "../ModalElements"
import { GeneralModalData } from "../../TaskDateList/TaskDateList"

export type TaskDateModalBaseProps = {
    generalModalData: GeneralModalData,
    setGeneralModalData: (newValue: GeneralModalData | undefined) => void
    onModalSucessfulSubmit: (modalValues: TaskDateModalValues) => void
}

export type TaskDateModalValues = {
    startDate: Date,
    endDate: Date,
    status: TaskFulfillmentStatus
}

export function TaskDateModalBase({
    generalModalData,
    setGeneralModalData,
    onModalSucessfulSubmit
}: TaskDateModalBaseProps): React.JSX.Element {
    
    // The form values for the modal
    const [startDate, setStartDate] = useState<Date | undefined>(generalModalData.modalStartingDate);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [status, setStatus] = useState<TaskFulfillmentStatus>('waiting');

    // Error messages when either the start or end date of the
    // modal is not filled.
    const noStartDateErrorMessage = "Prosím vyplňte datum počátku zakázky.";
    const noEndDateErrorMessage = "Prosím vyplňte datum ukončení zakázky.";

    // If this is defined, the modal will show an error message displaying
    // the content of this state.
    const [shownErrorMessage, setShownErrorMessage] = useState<string | undefined>(undefined);
    
    // Called when the form is submitted
    function handleTaskSubmit() {

        // Date check #1
        if(startDate === undefined)
        {
            setShownErrorMessage(noStartDateErrorMessage);
            return;
        }

        // Date check #2
        if(endDate === undefined)
        {
            // show error modal on unfilled date
            setShownErrorMessage(noEndDateErrorMessage);
            return;
        }

        // Check success
        onModalSucessfulSubmit({
            startDate,
            endDate,
            status
        });

        // Hide the modal by unassigning
        // the shown data.
        setGeneralModalData(undefined);

    }

    // Get all the possible values that a task can have
    // so we can fill the selection element with these options.
    const statusValues = Object.values(TaskFulfillmentValuesDisplay);

    const {taskName, taskCode} = generalModalData.dateAddTask;

    return (
        <ErrorModalBase
            errorMessage={shownErrorMessage}
            setErrorMessage={setShownErrorMessage}
        >
            <h1>Přidávám nové plnění zakázky</h1>
            <h2>{taskName + ' ' + taskCode}</h2>
            <ModalHeaderDate
                headerText="Počáteční datum"
                date={startDate}
                setDate={setStartDate}
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

