
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


export function orderTaskListByChildren(taskList: Task[])
{

    // contains an array of tasks that we have not
    // yet MARKED for processing
    // that is the elements in this array are not scheduled
    // to be processed in our loop
    // !! this array MUST be empty before exiting out of this function
    // the first element of the task list will always be processed
    // (just because the loop hasn't processed the task yet doesn't mean
    // it will not in the future - if the loop will process the task
    // sometime in the future, you will not find that given element in this list)
    let unmarkedUnprocessedTasks = [...taskList];

    const firstElement = unmarkedUnprocessedTasks.shift();

    // empty input array
    if(firstElement === undefined)
    {
        return [];
    }

    // the list has the same order as taskList
    // the only difference is that we can take items
    // out by their code
    const tasksByCode = createTaskCodeMap(taskList);
    
    // start at the first element
    const orderedList: Task[] = [firstElement];

    for (let i = 0; i < orderedList.length; i++) {
        const task = orderedList[i];

        // true if we finish processing this child and we would
        // exit this loop and finish processing
        const lastInProcessing = i === (orderedList.length - 1);

        const hasNodesLeftToProcess = unmarkedUnprocessedTasks.length > 0;

        // without children - we aren't going
        // to be unwrapping anything.
        if(!taskHasChildren(task))
        {
            // either continue processing the children
            // we have just unwrapped or if no more remain, try
            // to take a child out of the param list (block under if)
            if(lastInProcessing && hasNodesLeftToProcess)
            {
                const nextUnmarked = unmarkedUnprocessedTasks.shift() as Task;
                orderedList.push(nextUnmarked);
            }

            // if we are not last in orderedList, take
            // another item out of orderedList and try to unwrap it
            continue;
        }

        // with children - unwrap them
        const childrenCodes = task.childrenTaskCodes;
        
        for (let j = 0; j < childrenCodes.length; j++) {
            const childCode = childrenCodes[j];
            const childTask = tasksByCode[childCode];

            unmarkedUnprocessedTasks = unmarkedUnprocessedTasks.filter((val) => val.taskCode !== childTask.taskCode);

            orderedList.push(childTask);
        }
        
    }

    if(unmarkedUnprocessedTasks.length > 0)
    {
        throw new Error(`Treid to exit out of task ordering without processing all the tasks.`);
    }

    return orderedList;
}


export function createTaskCodeMap(taskList: Task[])
{
    const taskCodeMap: {[taskCode: string] : Task} = {};

    taskList.forEach((task) => {
        taskCodeMap[task.taskCode] = task;
    });

    return taskCodeMap;
}

export function getParentTask(task: Task, taskList: Task[]): Task | undefined
{

    const parent = taskList.find((taskFromList) => {

        // we are at the parameter task
        if(taskFromList.taskCode === task.taskCode)
        {
            return false;
        }

        const children = taskFromList.childrenTaskCodes;
        const matchingTask = children.find((childCode) => childCode === task.taskCode);
        return matchingTask !== undefined;
    });

    return parent;

}

/**
 * Returns false if there is a parent in the hierarchy that is not expanded,
 * otherwise returns true.
 * 
 * Also returns true on root elements (those without parents).
 */
export function getExpandedFromTree(task: Task, taskList: Task[])
{
    let usedTask: Task | undefined = task;
    
    
    while((usedTask = getParentTask(usedTask, taskList)) !== undefined)
    {
        const parentExpanded = usedTask.expanded;
        if(!parentExpanded)
        {
            return false;
        }
    }

    return true;
}

export function getTaskDepth(task: Task, taskList: Task[]): number
{

    let usedTask: Task | undefined = task;
    let count = 0;

    while((usedTask = getParentTask(usedTask, taskList)) !== undefined)
    {
        ++count;
    }

    return count;

}