import { createContext } from "react";
import { Task } from "../TaskTypes/Task";
import { getKeyForValueDefined } from "../GeneralUtils/GeneralUtils";
import { DoneIcon } from "../Icons/DoneIcon";
import React from "react";
import { HourglassIcon } from "../Icons/HourglassIcon";

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
    fulfillmentIcon: JSX.Element,
}

export const TaskFulfillmentIntoStyles: Record<TaskFulfillmentStatus, TaskFulfillmentStyles> = {
    done: {
        fulfillmentBgColor: '#2ea956',
        fulfillmentBgHoverColor: '#1d1e2c',
        fulfillmentForegroundColor: '#ffffff',
        fulfillmentForegroundHoverColor: '#2ea956',
        fulfillmentIcon: <DoneIcon />
    },
    waiting: {
        fulfillmentBgColor: '#fbbabd',
        fulfillmentBgHoverColor: '#1d1e2c',
        fulfillmentForegroundColor: '#e9414b',
        fulfillmentForegroundHoverColor: '#e9414b',
        fulfillmentIcon: <HourglassIcon />
    }
}

export type TaskFulfillmentStatus = keyof typeof TaskFulfillmentValues;

export type TaskFulfillment = {
    uuid: string,
    task: Task
    startDate: Date
    endDate: Date
    status: TaskFulfillmentStatus
}

/**
 * This type represents a complete object containing
 * all the fields of TaskFulfillment we can edit.
 * We can't edit the uuid or the associated task.
 */ 
export type TaskFulfillmentEditable = Pick<TaskFulfillment, 'startDate' | 'endDate' | 'status'>

export type TaskFulfillmentAction = {
    type: 'add',
    addedTask: TaskFulfillment
} | {
    type: 'edit',
    originalFulfillment: TaskFulfillment,
    newFulfillmentValues: TaskFulfillmentEditable
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
        case 'edit': {
            return oldTasks.map((taskFulfillment) => {
                // Edit the task
                if(taskFulfillment.uuid === action.originalFulfillment.uuid)
                {
                    return {
                        uuid: taskFulfillment.uuid, // keep the original uuid
                        task: taskFulfillment.task, // and task
                        ...action.newFulfillmentValues,
                    }
                }

                // Non-edit tasks stay - no need to create
                // a copy since no mutations are being done
                return taskFulfillment;
            })
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