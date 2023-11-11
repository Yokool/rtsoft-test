
import React, { useContext } from "react";
import { Task } from "../../TaskTypes/Task";
import { TaskFulfillmentDispatchContext } from "../../TaskFulfillment/TaskFulfillment";
import { TaskDateModalValues, TaskDateModalBase } from "./TaskDateModalBase";

/*
type EditTaskDateModalProps = {
    shownTask: Task
    setShownTask: (newValue: Task | undefined) => void
    startingDate: Date | undefined
}


export function EditTaskDateModal(props: EditTaskDateModalProps): React.JSX.Element {
    const {shownTask} = props;

    // Get the task fulfillment context, so we can add a new
    // task fulfillment
    const dispatchTaskFulfillment = useContext(TaskFulfillmentDispatchContext);

    // Adding a new task
    function handleModalBaseSubmitSuccess(modalValues: TaskDateModalValues) {
        dispatchTaskFulfillment({
            type: 'edit',
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
*/