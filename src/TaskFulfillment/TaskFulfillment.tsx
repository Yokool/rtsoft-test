import { createContext } from "react";
import { Task } from "../TaskTypes/Task.tsx";
import { getKeyForValueDefined } from "../GeneralUtils/GeneralUtils.tsx";
import { DoneIcon } from "../Icons/DoneIcon.tsx";
import React from "react";
import { HourglassIcon } from "../Icons/HourglassIcon.tsx";

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
    fulfillmentBgColor: string,
    fulfillmentBgHoverColor: string,
    fulfillmentForegroundColor: string,
    fulfillmentForegroundHoverColor: string,
}

export const TaskFulfillmentIntoStyles: Record<TaskFulfillmentStatus, TaskFulfillmentStyles> = {
    done: {
        fulfillmentBgColor: '#2ea956',
        fulfillmentBgHoverColor: '#1d1e2c',
        fulfillmentForegroundColor: '#ffffff',
        fulfillmentForegroundHoverColor: '#2ea956',
    },
    waiting: {
        fulfillmentBgColor: '#fbbabd',
        fulfillmentBgHoverColor: '#1d1e2c',
        fulfillmentForegroundColor: '#e9414b',
        fulfillmentForegroundHoverColor: '#e9414b',
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