import React, { createContext, useEffect, useRef, useState } from "react";
import { Task } from "../TaskTypes/Task";
import './TaskDateList.css';
import { dateToTableText, getSurroundingDatesToday } from "../DateUtils/DateUtils";
import { DateTableSelectionRow } from "./DateTableSelectionRow";
import { AddTaskDateModal } from "../Modals/AddTaskDateModal/AddTaskDateModal";
import { TaskFulfillment, TaskFulfillmentStatus } from "../TaskFulfillment/TaskFulfillment";
import { EditTaskDateModal } from "../Modals/AddTaskDateModal/EditTaskDateModal";
import { CompleteTaskRow } from "./CompleteTaskRow";

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
        return (
            <th key={dateHeaderString}>
                {dateHeaderString}
            </th>
        );
    })


    const taskListJSX = taskList.map(
        (task) => {
            return (
                <CompleteTaskRow
                    task={task}
                    surroundingDates={surroundingDates}
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
            <table className="taskTable" cellSpacing={0} cellPadding={0}>
                <tbody>
                    <tr>
                        <th className="cellSpacer"></th>
                        <th className="codeCell">Kód</th>
                        <th className="nameCell">Položka</th>
                        {dateHeadersJSX}
                    </tr>
                    {taskListJSX}
                </tbody>
            </table>
        </DateModalContext.Provider>
    )
}
