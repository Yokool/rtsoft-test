import React, { useState } from "react";
import "./TaskCalendar.css";

interface Task {
    taskCode: string,
    taskName: string,
}

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

type TaskAddProps = {
    taskList: Task[]
    setTaskList: (setTaskList: Task[]) => void
}

function TaskAdd({taskList, setTaskList} : TaskAddProps): React.JSX.Element {
    
    function handleTaskAdd() {
        setTaskList([
            ...taskList,
            {
                taskCode: 'AAA',
                taskName: 'BBB',
            }
        ])
    }

    
    return (
        <button onClick={handleTaskAdd}>
            Přidat novou zakázku
        </button>
    )
}

type TaskDateListProps = {
    taskList: Task[]
}

function TaskDateList({taskList}: TaskDateListProps): React.JSX.Element {

    const taskListJSX = taskList.map(
        (task) => {
            return (
                <tr>
                    <td>{task.taskCode}</td>
                    <td>{task.taskName}</td>
                </tr>
            );
        }
    );

    return (
        <table>
            <tr>
                <th>Kód</th>
                <th>Položka</th>
            </tr>
            {taskListJSX}
        </table>
    )
}