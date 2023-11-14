import React, { createContext, useEffect, useState } from "react";
import { Task, taskHasChildren } from "../../TaskTypes/Task";
import { dateToTableText, getSurroundingDates, getToday, isDateToday, normalizeDate } from "../../DateUtils/DateUtils";
import { AddTaskDateModal } from "../../Modals/AddTaskDateModal/AddTaskDateModal";
import { TaskFulfillment, TaskFulfillmentStatus } from "../../TaskFulfillment/TaskFulfillment";
import { EditTaskDateModal } from "../../Modals/AddTaskDateModal/EditTaskDateModal";
import { CompleteTaskRow } from "./CompleteTaskRow/CompleteTaskRow";
import { CellSpacerTH, TaskTable, TaskTableCodeCellTH, TaskTableNameCellTH, TaskTableTH, getWeekendColorOnWeekend } from "./TaskDateListStyledComponents";
import { TaskDateListSwitcher } from "./TaskDateListSwitcher";

type TaskDateListProps = {
    taskList: Task[]
}


export type DateModalContextValue = {
    generalModalData: GeneralModalData | undefined,
    setGeneralModalData: (newData: GeneralModalData) => void
}

export const DateModalContext = createContext<DateModalContextValue>({
    generalModalData: undefined,
    setGeneralModalData: () => {}
});

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

export type GeneralModalData = {
    dateAddTask: Task,
    /**
     * Holds the data at which the modal shall start - set by a child cell on which we click
     */
    modalStartingDate?: Date,
    modalInitialEndDate?: Date,
    modalInitialStatus?: TaskFulfillmentStatus,
    editedTaskFulfillment?: TaskFulfillment
}

export function TaskDateList({taskList}: TaskDateListProps): React.JSX.Element {

    // Counted from the example
    const dateShiftBackwards = 8;
    const dateShiftForwards = 19;

    const todayNormalized = normalizeDate(getToday());
    
    const [dateListBaseDate, setDateListBaseDate] = useState<Date>(todayNormalized);

    const [surroundingDates, setSurroundingDates] = useState<Date[]>([]);

    const [modalData, setModalData] = useState<GeneralModalData | undefined>(undefined);


    useEffect(() => {
        const surroundingDatesComputed = getSurroundingDates(dateListBaseDate, dateShiftBackwards, dateShiftForwards);
        setSurroundingDates(surroundingDatesComputed);
        
    }, [dateListBaseDate, dateShiftBackwards, dateShiftForwards])

    const dateListLeftmostDate = surroundingDates[0] ?? new Date();
    const dateListRightmostDate = surroundingDates[surroundingDates.length - 1] ?? new Date();
    
    const dateHeadersJSX = surroundingDates.map((date) => {
        
        const dateHeaderString = dateToTableText(date);
        const customColor = getWeekendColorOnWeekend(date);
        const isCellToday = isDateToday(date);
        
        return (
            <TaskTableTH key={dateHeaderString} $customBgColor={customColor} $isCellToday={isCellToday}>
                {dateHeaderString}
            </TaskTableTH>
        );
    })

    const taskListJSX = taskList.map(
        (task, index) => {
            return (
                <CompleteTaskRow
                    dateListStart={dateListLeftmostDate}
                    dateListEnd={dateListRightmostDate}
                    key={task.taskCode}
                    task={task}
                    surroundingDates={surroundingDates}
                    isLastRow={index === (taskList.length - 1)}
                />
            );
        }
    );


    const modalJSX = (modalData !== undefined && (
        (modalData.editedTaskFulfillment !== undefined)
        ?
        (
            <EditTaskDateModal
                generalModalData={modalData}
                setGeneralModalData={setModalData}
                taskFulfillment={modalData.editedTaskFulfillment}
            />
        )
        :
        (
            <AddTaskDateModal
                generalModalData={modalData}
                setGeneralModalData={setModalData}
            />
        )
    ))

    return (
        <DateModalContext.Provider value={{
            generalModalData: modalData,
            setGeneralModalData: setModalData
        }}>
            {modalJSX}
            <TaskDateListSwitcher
                date={dateListBaseDate}
                setDate={setDateListBaseDate}
            />
            <TaskTable className="taskTable" cellSpacing={0} cellPadding={0}>
                <tbody>
                    <tr>
                        <CellSpacerTH></CellSpacerTH>
                        <TaskTableCodeCellTH>Kód</TaskTableCodeCellTH>
                        <TaskTableNameCellTH>Položka</TaskTableNameCellTH>
                        {dateHeadersJSX}
                    </tr>
                    {taskListJSX}
                </tbody>
            </TaskTable>
        </DateModalContext.Provider>
    )
}
