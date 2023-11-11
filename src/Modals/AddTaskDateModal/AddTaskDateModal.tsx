import React, { useContext } from "react";
import { Task } from "../../TaskTypes/Task";
import { TaskFulfillmentDispatchContext } from "../../TaskFulfillment/TaskFulfillment";
import { TaskDateModalValues, TaskDateModalBase } from "./TaskDateModalBase";
import { GeneralModalData } from "../../TaskDateList/TaskDateList";

type AddTaskModalProps = {
    /**
     * The task associated with the modal (i.e. we click
     * a date in the calendar - the date is in a row of a particular task
     * -> we are adding a new fulfillment to this particular task through
     * the modal.)
     */
    generalModalData: GeneralModalData
    setGeneralModalData: (newValue: GeneralModalData | undefined) => void
    
}


export function AddTaskDateModal(props: AddTaskModalProps): React.JSX.Element {
    const {generalModalData} = props;

    // Get the task fulfillment context, so we can add a new
    // task fulfillment
    const dispatchTaskFulfillment = useContext(TaskFulfillmentDispatchContext);

    // Adding a new task
    function handleModalBaseSubmitSuccess(modalValues: TaskDateModalValues) {
        dispatchTaskFulfillment({
            type: 'add',
            addedTask: {
                task: generalModalData.dateAddTask,
                startDate: modalValues.startDate,
                endDate: modalValues.endDate,
                status: modalValues.status
            }
        });

    }
    
    return (<TaskDateModalBase
            onModalSucessfulSubmit={handleModalBaseSubmitSuccess}
            startDateValue={generalModalData.modalStartingDate}
            shownTask={generalModalData.dateAddTask}
            setGeneralModalData={props.setGeneralModalData}
            />
        );
}
