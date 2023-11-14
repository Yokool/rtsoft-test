
export interface Task {
    taskCode: string,
    taskName: string,
    childrenTaskCodes: string[]
}

export function taskHasChildren(task: Task)
{
    return task.childrenTaskCodes.length > 0;
}