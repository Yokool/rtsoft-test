import React, { Reducer, useReducer, useState } from "react";
import "./TaskCalendar.css";
import { Task } from './TaskTypes/Task.tsx';
import { TaskAdd } from "./TaskAdd.tsx";
import { TaskDateList } from "./TaskDateList/TaskDateList.tsx";
import { TaskFulfillment, TaskFulfillmentDispatchContext, taskFulfillmentReducer } from "./TaskFulfillment/TaskFulfillment.tsx";



export function TaskCalendar(): React.JSX.Element {
    const [taskList, setTaskList] = useState<Task[]>([]);

    const [taskFulfillmentList, dispatchTaskFulfillmentAction] = useReducer(taskFulfillmentReducer, [])
    console.log("FulfillmentList", taskFulfillmentList);

    return (
        <TaskFulfillmentDispatchContext.Provider value={dispatchTaskFulfillmentAction}>
            <div className="calendarOuterHolder">
                <TaskAdd 
                    taskList={taskList}
                    setTaskList={setTaskList}
                />
                <TaskDateList
                    taskList={taskList}
                />
            </div>
        </TaskFulfillmentDispatchContext.Provider>
    );
}

