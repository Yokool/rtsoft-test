import React, { createContext, useEffect, useState } from "react";
import { Task } from "../TaskTypes/Task";
import './TaskDateList.css';
import { dateToTableText, getSurroundingDatesToday, isDateToday, isDateWeekday } from "../DateUtils/DateUtils";
import { AddTaskDateModal } from "../Modals/AddTaskDateModal/AddTaskDateModal";
import { TaskFulfillment, TaskFulfillmentStatus } from "../TaskFulfillment/TaskFulfillment";
import { EditTaskDateModal } from "../Modals/AddTaskDateModal/EditTaskDateModal";
import { CompleteTaskRow } from "./CompleteTaskRow";
import { CellSpacerTH, TaskTableCodeCellTD, TaskTableCodeCellTH, TaskTableNameCellTH, TaskTableTH, WeekendColor, getWeekendColorOnWeekend } from "./TaskDateListStyledComponents";
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

    const [surroundingDates, setSurroundingDates] = useState<Date[]>([]);

    const [modalData, setModalData] = useState<GeneralModalData | undefined>(undefined);


    useEffect(() => {
        const surroundingDatesComputed = getSurroundingDatesToday(dateShiftBackwards, dateShiftForwards);
        setSurroundingDates(surroundingDatesComputed);
        
    }, [dateShiftBackwards, dateShiftForwards])

    
    
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
            <TaskDateListSwitcher />
            <table className="taskTable" cellSpacing={0} cellPadding={0}>
                <tbody>
                    <tr>
                        <CellSpacerTH></CellSpacerTH>
                        <TaskTableCodeCellTH>Kód</TaskTableCodeCellTH>
                        <TaskTableNameCellTH>Položka</TaskTableNameCellTH>
                        {dateHeadersJSX}
                    </tr>
                    {taskListJSX}
                </tbody>
            </table>
        </DateModalContext.Provider>
    )
}
