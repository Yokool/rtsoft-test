
import React, { useContext } from "react";
import { TaskFulfillment, TaskFulfillmentDispatchContext } from "../../TaskFulfillment/TaskFulfillment";
import { TaskDateModalValues, TaskDateModalBase } from "./TaskDateModalBase";
import { GeneralModalData } from "../../TaskCalendar/TaskDateList/TaskDateList";
import { normalizeDate } from "../../DateUtils/DateUtils";


type EditTaskDateModalProps = {
    generalModalData: GeneralModalData,
    setGeneralModalData: (newData: GeneralModalData | undefined) => void
    taskFulfillment: TaskFulfillment
}


export function EditTaskDateModal(props: EditTaskDateModalProps): React.JSX.Element {

    // Get the task fulfillment context, so we can add edit a
    // task fulfillment
    const dispatchTaskFulfillment = useContext(TaskFulfillmentDispatchContext);

    // Editing an existing task
    function handleModalBaseSubmitSuccess(modalValues: TaskDateModalValues) {
        dispatchTaskFulfillment({
            type: 'edit',
            originalFulfillment: props.taskFulfillment,
            newFulfillmentValues: {
                startDate: normalizeDate(modalValues.startDate),
                endDate: normalizeDate(modalValues.endDate),
                status: modalValues.status
            }
        });

    }
    
    return (<TaskDateModalBase
                onModalSucessfulSubmit={handleModalBaseSubmitSuccess}
                generalModalData={props.generalModalData}
                setGeneralModalData={props.setGeneralModalData}
            />
        );
}
