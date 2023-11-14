import React, { createContext, useEffect, useState } from "react";
import { Task, getParentTask, taskHasChildren } from "../../TaskTypes/Task";
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

            const parent = getParentTask(task, taskList);

            // only if there is an unexpanded parent do you not render
            if(parent !== undefined && !parent.expanded)
            {
                return null;
            }

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
