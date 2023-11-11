import { createContext } from "react";
import { Task } from "../TaskTypes/Task.tsx";
import { getKeyForValueDefined } from "../GeneralUtils/GeneralUtils.tsx";

export const TaskFulfillmentValues = {
    'done': undefined,
    'waiting': undefined
}

export const TaskFulfillmentValuesDisplay: Record<TaskFulfillmentStatus, string> = {
    waiting: 'Nedokončeno',
    done: 'Hotovo'
}

export function turnTaskFulfillmentDisplayIntoKey(displayValue: string) {
    return getKeyForValueDefined(TaskFulfillmentValuesDisplay, displayValue);
}

export type TaskFulfillmentStyles = {
    fulfillmentColor: string
}

export const TaskFulfillmentIntoStyles: Record<TaskFulfillmentStatus, TaskFulfillmentStyles> = {
    done: {
        fulfillmentColor: '#2ea956'
    },
    waiting: {
        fulfillmentColor: '#fbbabd'
    }
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

export const TaskFulfillmentContext = createContext<TaskFulfillment[]>([]);

export const TaskFulfillmentDispatchContext = createContext<(action: TaskFulfillmentAction) => void>(
    () => {}
)

export function getAssociatedFulfillmentsToTask(task: Task, taskList: TaskFulfillment[])
{
    return taskList.filter((fulfillment) => {
        return fulfillment.task.taskCode === task.taskCode;
    })
}

export function getAssociatedFulfillmentsToStartDate(task: Task, date: Date, taskFulfillmentList: TaskFulfillment[])
{
    const taskFulfillments = getAssociatedFulfillmentsToTask(task, taskFulfillmentList);
    return taskFulfillments.filter((task) => {
        return task.startDate === date;
    })
}