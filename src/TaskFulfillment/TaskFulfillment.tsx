import { Task } from "../TaskTypes/Task.tsx";

export type TaskFulfillmentStatus = 
    'done' |
    'waiting';

export type TaskFulfillment = {
    task: Task
    startDate: Date
    endDate: Date
    status: TaskFulfillmentStatus
}