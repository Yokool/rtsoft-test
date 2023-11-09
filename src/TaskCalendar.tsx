import React, { useState } from "react";
import "./TaskCalendar.css";
import { AddTaskModal } from "./AddTaskModal/AddTaskModal.tsx";
import { Task } from './TaskTypes/Task.tsx';

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
    setTaskList: (taskList: Task[]) => void
}

function TaskAdd({taskList, setTaskList} : TaskAddProps): React.JSX.Element {
    
    function handleTaskAdd() {
        setShowingModal(true);
        /*
        setTaskList([
            ...taskList,
            {
                taskCode: 'AAA',
                taskName: 'BBB',
            }
        ])
        */
    }

    const [showingModal, setShowingModal] = useState(false);

    
    return (
        <>
            {showingModal && <AddTaskModal
                setTaskList={setTaskList}
                taskList={taskList}
                setShowingModal={setShowingModal}
            />}
            <button onClick={handleTaskAdd}>
                Přidat novou zakázku
            </button>
        </>
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