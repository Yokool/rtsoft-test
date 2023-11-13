import React, { useContext } from "react";
import { DateTableSelectionRow } from "./DateTableSelectionRow";
import { Task } from "../TaskTypes/Task";
import './TaskDateList.css';
import { TaskFulfillment, TaskFulfillmentContext, addRowParameterToEachFulfillment, clampTaskfulfillmentsToDates, getAssociatedFulfillmentsToTask } from "../TaskFulfillment/TaskFulfillment";
import { CellSpacerTD, DefaultCellHeight, TaskTableCodeCellTD, TaskTableNameCellTD } from "./TaskDateListStyledComponents";

export type CompleteTaskRowProps = {
    task: Task
    surroundingDates: Date[]
    isLastRow: boolean
    dateListStart: Date,
    dateListEnd: Date
}

export type CommonTaskRowCellStyle = {
    height: number
}

export function CompleteTaskRow({
    task, surroundingDates, isLastRow, dateListStart, dateListEnd
}: CompleteTaskRowProps): JSX.Element
{

    const taskFulfillmentList = useContext(TaskFulfillmentContext);
    const fulfillmentsInThisRow = getAssociatedFulfillmentsToTask(task, taskFulfillmentList);

    const {taskfulfillmentsParameterized, subrowCount} = addRowParameterToEachFulfillment(fulfillmentsInThisRow);
    const taskfulfillmentsParameterizedClamped = clampTaskfulfillmentsToDates(taskfulfillmentsParameterized, dateListStart, dateListEnd);

    // Either use the default when no tasks have been added
    // or make enough space for all the tasks
    const commonHeight = subrowCount === 0 ? DefaultCellHeight : (subrowCount * DefaultCellHeight)
    const commonHeightStyle: CommonTaskRowCellStyle = {
        height: commonHeight
    }

    return (<tr key={task.taskCode}>
        <CellSpacerTD style={commonHeightStyle}></CellSpacerTD>
        <TaskTableCodeCellTD
            style={commonHeightStyle}>
                {task.taskCode}
            </TaskTableCodeCellTD>
        <TaskTableNameCellTD
            style={commonHeightStyle}>
                {task.taskName}
        </TaskTableNameCellTD>
        <DateTableSelectionRow
            completeDateList={surroundingDates}
            task={task}
            commonCellStyle={commonHeightStyle}
            parameterizedTaskFulfillmentList={taskfulfillmentsParameterizedClamped}
            subRowCount={subrowCount}
            isLastRow={isLastRow}
        />
    </tr>)
}