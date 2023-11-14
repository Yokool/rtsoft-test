import React, { useReducer, useState } from "react";
import "./TaskCalendar.css";
import { Task } from '../TaskTypes/Task';
import { TaskAddButton } from "./TaskDateList/TaskAdd/TaskAdd";
import { TaskDateList, orderTaskListByChildren } from "./TaskDateList/TaskDateList";
import { TaskFulfillmentContext, TaskFulfillmentDispatchContext, taskFulfillmentReducer } from "../TaskFulfillment/TaskFulfillment";



export function TaskCalendar(): React.JSX.Element {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const orderedTaskList = orderTaskListByChildren(taskList);

    const [taskFulfillmentList, dispatchTaskFulfillmentAction] = useReducer(taskFulfillmentReducer, [])

    return (
        <TaskFulfillmentContext.Provider value={taskFulfillmentList}>
            <TaskFulfillmentDispatchContext.Provider value={dispatchTaskFulfillmentAction}>
                <div className="calendarOuterHolder">
                    <TaskAddButton 
                        taskList={orderedTaskList}
                        setTaskList={setTaskList}
                    />
                    <TaskDateList
                        taskList={orderedTaskList}
                    />
                </div>
            </TaskFulfillmentDispatchContext.Provider>
        </TaskFulfillmentContext.Provider>
    );
}

export function taskListContainsCode(taskList: Task[], taskCode: string)
{
    const foundTask = taskList.find((task) => task.taskCode === taskCode);
    return foundTask !== undefined;
}