import React from "react";
import { Task } from "../TaskTypes/Task.tsx";
import './TaskDateList.css';

type TaskDateListProps = {
    taskList: Task[]
}

export function TaskDateList({taskList}: TaskDateListProps): React.JSX.Element {

    const taskListJSX = taskList.map(
        (task) => {
            return (
                <tr key={task.taskCode}>
                    <td className="cellSpacer"></td>
                    <td className="codeCell">{task.taskCode}</td>
                    <td>{task.taskName}</td>
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
                    <th>Položka</th>
                </tr>
                {taskListJSX}
            </tbody>
        </table>
    )
}