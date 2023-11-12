import React, { useContext } from "react";
import { DateTableSelectionRow } from "./DateTableSelectionRow";
import { Task } from "../TaskTypes/Task";
import './TaskDateList.css';
import { TaskFulfillmentContext, addRowParameterToEachFulfillment, getAssociatedFulfillmentsToTask } from "../TaskFulfillment/TaskFulfillment";
import { CellSpacerTD, TaskTableCodeCellTD, TaskTableNameCellTD } from "./TaskDateListStyledComponents";

export type CompleteTaskRowProps = {
    task: Task
    surroundingDates: Date[]
}

export function CompleteTaskRow({task, surroundingDates}: CompleteTaskRowProps): JSX.Element
{

    const taskFulfillmentList = useContext(TaskFulfillmentContext);
    const fulfillmentsInThisRow = getAssociatedFulfillmentsToTask(task, taskFulfillmentList);

    const {taskfulfillmentsParameterized, subrowCount} = addRowParameterToEachFulfillment(fulfillmentsInThisRow);

    return (<tr key={task.taskCode}>
        <CellSpacerTD></CellSpacerTD>
        <TaskTableCodeCellTD>{task.taskCode}</TaskTableCodeCellTD>
        <TaskTableNameCellTD>{task.taskName}</TaskTableNameCellTD>
        <DateTableSelectionRow
            completeDateList={surroundingDates}
            task={task}
        />
    </tr>)
}