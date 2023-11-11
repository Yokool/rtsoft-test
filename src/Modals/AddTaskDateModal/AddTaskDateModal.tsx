import React, { useContext } from "react";
import { Task } from "../../TaskTypes/Task";
import { TaskFulfillmentDispatchContext } from "../../TaskFulfillment/TaskFulfillment";
import { TaskDateModalValues, TaskDateModalBase } from "./TaskDateModalBase";

type AddTaskModalProps = {
    /**
     * The task associated with the modal (i.e. we click
     * a date in the calendar - the date is in a row of a particular task
     * -> we are adding a new fulfillment to this particular task through
     * the modal.)
     */
    shownTask: Task
    setShownTask: (newValue: Task | undefined) => void
    
    /**
     * The initial value for the modal in the startDate field.
     * This is taken out of the date of the cell we click on.
     */
    startingDate: Date | undefined
}


export function AddTaskDateModal(props: AddTaskModalProps): React.JSX.Element {
    const {shownTask} = props;

    // Get the task fulfillment context, so we can add a new
    // task fulfillment
    const dispatchTaskFulfillment = useContext(TaskFulfillmentDispatchContext);

    // Adding a new task
    function handleModalBaseSubmitSuccess(modalValues: TaskDateModalValues) {
        dispatchTaskFulfillment({
            type: 'add',
            addedTask: {
                task: shownTask,
                startDate: modalValues.startDate,
                endDate: modalValues.endDate,
                status: modalValues.status
            }
        });

    }
    
    return (<TaskDateModalBase
            onModalSucessfulSubmit={handleModalBaseSubmitSuccess}
            startDateValue={props.startingDate}
            shownTask={shownTask}
            setShownTask={props.setShownTask}
            />
        );
}
