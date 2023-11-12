import { useState } from "react"
import { TaskFulfillmentStatus, TaskFulfillmentValues, TaskFulfillmentValuesDisplay, turnTaskFulfillmentDisplayIntoKey } from "../../TaskFulfillment/TaskFulfillment"
import { ErrorModalBase } from "../ErrorModal/ErrorModal"
import { ModalHeaderDate, ModalHeaderSelect, ModalHeaderSelectOption, ModalSubmit } from "../ModalElements"
import { GeneralModalData } from "../../TaskDateList/TaskDateList"
import { getKeysTyped } from "../../GeneralUtils/GeneralUtils"

export type TaskDateModalBaseProps = {
    generalModalData: GeneralModalData,
    setGeneralModalData: (newValue: GeneralModalData | undefined) => void,
    onModalSucessfulSubmit: (modalValues: TaskDateModalValues) => void,
}

/**
 * The return values from the form
 */
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
    const [endDate, setEndDate] = useState<Date | undefined>(generalModalData.modalInitialEndDate);
    
    const [status, setStatus] = useState<TaskFulfillmentStatus>(generalModalData.modalInitialStatus || 'waiting');
    
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

    const possibleStatusValues = getKeysTyped(TaskFulfillmentValues);

    // to be able to use it for checking against the options value
    const possibleStatusValuesStringified = possibleStatusValues.map((val) => val.toString());

    const modalOptions: ModalHeaderSelectOption[] = possibleStatusValues.map((taskFulfillmentStatusValue) => {
        console.log(status);
        return {
            optionValue: taskFulfillmentStatusValue,
            optionDisplayValue: TaskFulfillmentValuesDisplay[taskFulfillmentStatusValue],
            selected: status === taskFulfillmentStatusValue
        };

    });

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
                options={modalOptions}
                onChange={(newValue) => {
                    // Exhaustive check -> this really
                    // shouldn't happen unless we passed
                    // something different to options={}
                    if(!possibleStatusValuesStringified.includes(newValue))
                    {
                        throw new Error(`${newValue} is not contained within the keys of ${possibleStatusValues}.`);
                    }


                    // this is ok thanks to the check
                    const newValueStatus = newValue as TaskFulfillmentStatus;
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

