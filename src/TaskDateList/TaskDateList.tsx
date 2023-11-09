import React, { useEffect, useRef, useState } from "react";
import { Task } from "../TaskTypes/Task.tsx";
import './TaskDateList.css';
import { getSurroundingDatesToday } from "../DateUtils/DateUtils.tsx";

type TaskDateListProps = {
    taskList: Task[]
}

export function TaskDateList({taskList}: TaskDateListProps): React.JSX.Element {

    const dateShiftBackwards = 8;
    const dateShiftForwards = 19;

    const [surroundingDates, setSurroundingDates] = useState<Date[]>([]);
    
    useEffect(() => {
        const surroundingDatesComputed = getSurroundingDatesToday(dateShiftBackwards, dateShiftForwards);
        setSurroundingDates(surroundingDatesComputed);
        
    }, [dateShiftBackwards, dateShiftForwards])

    
    const dateHeadersJSX = surroundingDates.map((date) => {
        return (
            <th>
                {date.getDay()}
            </th>
        );
    })

    const taskListJSX = taskList.map(
        (task) => {
            return (
                <tr key={task.taskCode}>
                    <td className="cellSpacer"></td>
                    <td className="codeCell">{task.taskCode}</td>
                    <td className="nameCell">{task.taskName}</td>
                </tr>
            );
        }
    );


    return (
        <table className="taskTable" cellSpacing={0}>
            <tbody>
                <tr>
                    <th className="cellSpacer"></th>
                    <th className="codeCell">Kód</th>
                    <th className="nameCell">Položka</th>
                    {dateHeadersJSX}
                </tr>
                {taskListJSX}
            </tbody>
        </table>
    )
}
