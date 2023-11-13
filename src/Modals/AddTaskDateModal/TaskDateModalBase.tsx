import { useState } from "react"
import { TaskFulfillmentStatus, TaskFulfillmentValues, TaskFulfillmentValuesDisplay } from "../../TaskFulfillment/TaskFulfillment"
import { ErrorModalBase } from "../ErrorModal/ErrorModal"
import { GeneralModalData } from "../../TaskCalendar/TaskDateList/TaskDateList"
import { getKeysTyped } from "../../GeneralUtils/GeneralUtils"
import { isDate2LargerThanDate1ByDays } from "../../DateUtils/DateUtils"
import { ModalHeaderDate } from "../ModalElements/ModalHeaderDate"
import { ModalHeaderSelectOption, ModalHeaderSelect } from "../ModalElements/ModalHeaderSelect"
import { ModalSubmit } from "../ModalElements/ModalSubmit"

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
    const startDateLargerThanEndMessage = "Zakázka nemůže končit před tím, než začne.";

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

        if(!isDate2LargerThanDate1ByDays(startDate, endDate))
        {
            setShownErrorMessage(startDateLargerThanEndMessage);
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
        
        return {
            optionValue: taskFulfillmentStatusValue,
            optionDisplayValue: TaskFulfillmentValuesDisplay[taskFulfillmentStatusValue],
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
                defaultValue={status}
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

