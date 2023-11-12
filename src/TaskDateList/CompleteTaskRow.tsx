import React from "react";
import { DateTableSelectionRow } from "../DateTableSelectionRow";
import { Task } from "../TaskTypes/Task";
import './TaskDateList.css';

export type CompleteTaskRowProps = {
    task: Task
    surroundingDates: Date[]
}

export function CompleteTaskRow({task, surroundingDates}: CompleteTaskRowProps): JSX.Element
{
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