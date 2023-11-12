import React, { useContext } from "react";
import { DateTableSelectionRow } from "./DateTableSelectionRow";
import { Task } from "../TaskTypes/Task";
import './TaskDateList.css';
import { TaskFulfillmentContext, getAssociatedFulfillmentsToTask } from "../TaskFulfillment/TaskFulfillment";

export type CompleteTaskRowProps = {
    task: Task
    surroundingDates: Date[]
}

export function CompleteTaskRow({task, surroundingDates}: CompleteTaskRowProps): JSX.Element
{

    const taskFulfillmentList = useContext(TaskFulfillmentContext);
    const fulfillmentsInThisRow = getAssociatedFulfillmentsToTask(task, taskFulfillmentList);
    

    return (<tr key={task.taskCode}>
        <td className="cellSpacer"></td>
        <td className="codeCell">{task.taskCode}</td>
        <td className="nameCell">{task.taskName}</td>
        <DateTableSelectionRow
            completeDateList={surroundingDates}
            task={task}
        />
    </tr>)
}