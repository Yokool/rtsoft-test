import { createContext } from "react";
import { Task } from "../TaskTypes/Task";
import { getKeyForValueDefined } from "../GeneralUtils/GeneralUtils";
import { DoneIcon } from "../Icons/DoneIcon";
import React from "react";
import { HourglassIcon } from "../Icons/HourglassIcon";
import { clampDate, dateIntervalsOverlapByDays, normalizeDate } from "../DateUtils/DateUtils";
import { StarIcon } from "../Icons/StarIcon";

export const TaskFulfillmentValues = {
    'new': undefined,
    'waiting': undefined,
    'done': undefined
}

export const TaskFulfillmentValuesDisplay: Record<TaskFulfillmentStatus, string> = {
    new: 'Nový',
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
    new: {
        fulfillmentBgColor: '#6622CC',
        fulfillmentBgHoverColor: '#1d1e2c',
        fulfillmentForegroundColor: '#ffffff',
        fulfillmentForegroundHoverColor: '#F8F32B',
        fulfillmentIcon: <StarIcon />
    },
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
        fulfillmentForegroundHoverColor: '#d90429',
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

export type TaskFulfillmentParametrized = TaskFulfillment & {
    subRow: number
    // values used purely for rendering
    clampedStartDate: Date
    clampedEndDate: Date
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
} | {
    type: 'delete',
    fulfillment: TaskFulfillment
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
            });
        }
        case 'delete': {
            return oldTasks.filter((taskFulfillment) => {
                return taskFulfillment.uuid !== action.fulfillment.uuid;
            });
        }
    }   
}

export const TaskFulfillmentContext = createContext<TaskFulfillment[]>([]);

export const TaskFulfillmentDispatchContext = createContext<(action: TaskFulfillmentAction) => void>(
    () => {}
)

export function getAssociatedFulfillmentsToTask(task: Task, taskList: TaskFulfillment[])
{
    const foundElement = taskList.filter((fulfillment) => {
        return fulfillment.task.taskCode === task.taskCode;
    })

    return foundElement;
}

/**
 * Returns all the task fulfillments related to the parameter
 * task and date from the complete taskFulfillmentList.
 */
export function getAssociatedFulfillmentsToStartDate(task: Task, date: Date, taskFulfillmentList: TaskFulfillment[])
{
    // Normalize the date to the start of the day
    const dateNormalized = normalizeDate(date);

    // Get the fulfillments associated to the parameter task
    const taskFulfillments = getAssociatedFulfillmentsToTask(task, taskFulfillmentList);

    const associatedTask = taskFulfillments.filter((task) => {

        const taskStartDateNormalized = normalizeDate(task.startDate);
        
        return taskStartDateNormalized.getTime() === dateNormalized.getTime();
    })

    return associatedTask;
}

export function filterParamFulfillmentsByClampedStartDate(taskFulfillmentList: TaskFulfillmentParametrized[], date: Date)
{
    return taskFulfillmentList.filter((fulfillment) => fulfillment.clampedStartDate.getTime() === date.getTime());
}

export function safeCastToParameterizedFulfillmentListVersion(taskFulfillmentList: TaskFulfillment[])
{
    // No elements succeeds automatically
    if(taskFulfillmentList.length === 0)
    {
        return taskFulfillmentList as TaskFulfillmentParametrized[];
    }

    // Try to find at least one element
    // that has .subRow undefined
    const possiblyUndefinedParameterizedTask = taskFulfillmentList.find((task) => {
        const taskCast = task as TaskFulfillmentParametrized;
        return taskCast.subRow === undefined;
    })

    if(possiblyUndefinedParameterizedTask !== undefined)
    {
        throw new Error("Failed to cast a taskFulfillmentList into a parameterized list.");
    }

    return taskFulfillmentList as TaskFulfillmentParametrized[];
}

export function clampTaskfulfillmentsToDates(
    taskfulfillmentList: TaskFulfillmentParametrized[],
    intervalStart: Date,
    intervalEnd: Date)
{

    return taskfulfillmentList.map((fulfillment) => {

        const clampedStart = clampDate(fulfillment.startDate, intervalStart, intervalEnd);
        const clampedEnd = clampDate(fulfillment.endDate, intervalStart, intervalEnd);

        // This means that the fulfillment is completely
        // out of the interval we are displaying.
        // We can then simply return the original objects
        // that doesn't alter the clamped variables and makes it
        // so the fulfillment is not rendered.
        if(fulfillment.endDate < intervalStart || fulfillment.startDate > intervalEnd)
        {
            return {
                ...fulfillment
            };
        }
        
        return {
            ...fulfillment,
            clampedStartDate: clampedStart,
            clampedEndDate: clampedEnd
        }

    });

}

/**
 * Takes the fulfillments associated to a particular task and checks
 * if the fulfillment rows overlap - if there is an overlap - tells each
 * task in what subrow of the task row the fulfillment should be in order
 * to avoid this.
 * 
 * 
 * children will be placed as they appear in the list
 * i.e. the first child will get the first row
 * the second child will get the first row if he doesn't overlap
 * with any of the elements in the first row
 * 
 * if he does overlap - he gets placed in the second row
 * 
 * the third child will go to the first row if he doesn't
 * overlap with any of the items in the first row
 * 
 * otherwise he will try the second row
 * 
 * if he exhausts all of his options, he will get placed
 * in the third row
 */
export function addRowParameterToEachFulfillment(fulfillmentsInTask: TaskFulfillment[]): {
    taskfulfillmentsParameterized: TaskFulfillmentParametrized[],
    subrowCount: number,
}
{
    // Stores an array of arrays, where each
    // array represents one subrow of task fulfillments
    // every subrow can contain n children of TaskFulfillment (as long as they don't
    // overlap)

    const fulfillmentSubrows: TaskFulfillment[][] = [];


    // Take all the fulfillments
    const parameterizedFulfillments = fulfillmentsInTask.map((fulfillment) => {

        // Check them against the subrows from top to bottom
        for (let i = 0; i < fulfillmentSubrows.length; i++)
        {
            // Take a subrow
            const subrow = fulfillmentSubrows[i];

            // Try to find at least one element where we overlap
            const overlappingFulfillment = subrow.find((subrowFulfillment) => {
                return taskFulfillmentsIntersect(subrowFulfillment, fulfillment);
            });

            // No overlapping element in this row
            // -> we can insert the elemenent there without creating a
            // new row.
            if(overlappingFulfillment === undefined)
            {
                // add the fulfillment to this subrow
                subrow.push(fulfillment);
                // and map the parameterized version
                return {
                    ...fulfillment,
                    clampedStartDate: fulfillment.startDate,
                    clampedEndDate: fulfillment.endDate,
                    subRow: i
                }
            }

            // we overlap one of the elements, continue
        }

        // there wasn't any row we could insert ourselves into
        // create a new row for our fulfillment
        fulfillmentSubrows.push([fulfillment]);
        // and map the parameterized result
        const fulfillmentParametrized: TaskFulfillmentParametrized = {
            ...fulfillment,
            subRow: fulfillmentSubrows.length - 1,
            clampedStartDate: fulfillment.startDate,
            clampedEndDate: fulfillment.endDate
        }

        return fulfillmentParametrized;
    })

    return {
        taskfulfillmentsParameterized: parameterizedFulfillments,
        subrowCount: fulfillmentSubrows.length
    };
}

export function taskFulfillmentsIntersect(fulfillment1: TaskFulfillment, fulfillment2: TaskFulfillment)
{
    const start1 = fulfillment1.startDate;
    const end1 = fulfillment1.endDate;

    const start2 = fulfillment2.startDate;
    const end2 = fulfillment2.endDate;

    return dateIntervalsOverlapByDays(
        start1,
        end1,
        start2,
        end2
    );
}
