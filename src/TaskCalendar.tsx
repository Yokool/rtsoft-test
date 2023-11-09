import React, { useState } from "react";
import "./TaskCalendar.css";
import { Task } from './TaskTypes/Task.tsx';
import { TaskAdd } from "./TaskAdd.tsx";
import { TaskDateList } from "./TaskDateList/TaskDateList.tsx";

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
