
export interface Task {
    taskCode: string,
    taskName: string,
    childrenTaskCodes: string[]
    expanded: boolean
}

export function taskHasChildren(task: Task)
{
    return task.childrenTaskCodes.length > 0;
}