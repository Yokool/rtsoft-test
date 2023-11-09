import React, { Reducer, useReducer, useState } from "react";
import "./TaskCalendar.css";
import { Task } from './TaskTypes/Task.tsx';
import { TaskAdd } from "./TaskAdd.tsx";
import { TaskDateList } from "./TaskDateList/TaskDateList.tsx";
import { TaskFulfillment } from "./TaskFulfillment/TaskFulfillment.tsx";


export function TaskCalendar(): React.JSX.Element {
    const [taskList, setTaskList] = useState<Task[]>([]);

    const [taskFulfillmentList, dispatchTaskFulfillmentAction] = useReducer(taskFulfillmentReducer, [])

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

export type TaskFulfillmentAction = {
    type: 'add',
    addedTask: TaskFulfillment
}



export const taskFulfillmentReducer = (oldTasks: TaskFulfillment[], action: TaskFulfillmentAction): TaskFulfillment[] => {
    switch(action.type) {
        case 'add': {
            return [
                ...oldTasks,
                {
                    ...action.addedTask
                }
            ];
        }
    }   
}