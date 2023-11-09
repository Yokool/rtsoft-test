import React, { createContext, useEffect, useRef, useState } from "react";
import { Task } from "../TaskTypes/Task.tsx";
import './TaskDateList.css';
import { dateToTableText, getSurroundingDatesToday } from "../DateUtils/DateUtils.tsx";
import { DateTableSelectionRow } from "../DateTableSelectionRow.tsx";
import { AddTaskDateModal } from "../Modals/AddTaskDateModal/AddTaskDateModal.tsx";

type TaskDateListProps = {
    taskList: Task[]
}

export const DateAddTaskContext = createContext<Task | undefined>(undefined);
export const DateAddTaskSetContext = createContext<(task: Task) => void>(() => {});

export function TaskDateList({taskList}: TaskDateListProps): React.JSX.Element {

    const dateShiftBackwards = 8;
    const dateShiftForwards = 19;

    const [surroundingDates, setSurroundingDates] = useState<Date[]>([]);
    
    const [dateAddTask, setDateAddTask] = useState<Task | undefined>(undefined);


    useEffect(() => {
        const surroundingDatesComputed = getSurroundingDatesToday(dateShiftBackwards, dateShiftForwards);
        setSurroundingDates(surroundingDatesComputed);
        
    }, [dateShiftBackwards, dateShiftForwards])

    
    const dateHeadersJSX = surroundingDates.map((date) => {
        
        const dateHeaderString = dateToTableText(date);
        return (
            <th key={dateHeaderString}>
                {dateHeaderString}
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
                    <DateTableSelectionRow
                        completeDateList={surroundingDates}
                        task={task}
                    />
                </tr>
            );
        }
    );


    return (
        <DateAddTaskContext.Provider value={dateAddTask}>
            <DateAddTaskSetContext.Provider value={setDateAddTask}>
                {dateAddTask !== undefined && <AddTaskDateModal shownTask={dateAddTask} />}
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
            </DateAddTaskSetContext.Provider>
        </DateAddTaskContext.Provider>
    )
}
