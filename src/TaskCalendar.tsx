import React, { useReducer, useState } from "react";
import "./TaskCalendar.css";
import { Task } from './TaskTypes/Task';
import { TaskAdd } from "./TaskAdd";
import { TaskDateList } from "./TaskDateList/TaskDateList";
import { TaskFulfillmentContext, TaskFulfillmentDispatchContext, taskFulfillmentReducer } from "./TaskFulfillment/TaskFulfillment";



export function TaskCalendar(): React.JSX.Element {
    const [taskList, setTaskList] = useState<Task[]>([]);

    const [taskFulfillmentList, dispatchTaskFulfillmentAction] = useReducer(taskFulfillmentReducer, [])
    console.log("FulfillmentList", taskFulfillmentList);

    return (
        <TaskFulfillmentContext.Provider value={taskFulfillmentList}>
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
        </TaskFulfillmentContext.Provider>
    );
}

