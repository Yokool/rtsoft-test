import { createContext } from "react";
import { Task } from "../TaskTypes/Task.tsx";

export const TaskFulfillmentValues = {
    'done': undefined,
    'waiting': undefined
}

export const TaskFulfillmentValuesDisplay: Record<TaskFulfillmentStatus, string> = {
    waiting: 'Nedokončeno',
    done: 'Hotovo'
}

export type TaskFulfillmentStatus = keyof typeof TaskFulfillmentValues;

export type TaskFulfillment = {
    task: Task
    startDate: Date
    endDate: Date
    status: TaskFulfillmentStatus
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

export const TaskFulfillmentDispatchContext = createContext<(action: TaskFulfillmentAction) => void>(
    () => {}
)