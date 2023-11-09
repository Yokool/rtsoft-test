import React, { useState } from "react";
import "./TaskCalendar.css";
import { Task } from './TaskTypes/Task.tsx';
import { TaskAdd } from "./TaskAdd.tsx";

export function TaskCalendar(): React.JSX.Element {
    const [taskList, setTaskList] = useState<Task[]>([]);

    return (
        <div className="calendarOuterHolder">
            <TaskAdd 
                taskList={taskList}
                setTaskList={setTaskList}
            />
            <TaskDateList
                taskList={taskList}
            />
        </div>
    );
}

type TaskDateListProps = {
    taskList: Task[]
}

function TaskDateList({taskList}: TaskDateListProps): React.JSX.Element {

    const taskListJSX = taskList.map(
        (task) => {
            return (
                <tr key={task.taskCode}>
                    <td>{task.taskCode}</td>
                    <td>{task.taskName}</td>
                </tr>
            );
        }
    );

    return (
        <table>
            <tbody>
                <tr>
                    <th>Kód</th>
                    <th>Položka</th>
                </tr>
                {taskListJSX}
            </tbody>
        </table>
    )
}