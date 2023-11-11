import React, { createContext, useEffect, useRef, useState } from "react";
import { Task } from "../TaskTypes/Task";
import './TaskDateList.css';
import { dateToTableText, getSurroundingDatesToday } from "../DateUtils/DateUtils";
import { DateTableSelectionRow } from "../DateTableSelectionRow";
import { AddTaskDateModal } from "../Modals/AddTaskDateModal/AddTaskDateModal";
import { TaskFulfillment } from "../TaskFulfillment/TaskFulfillment";

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
    modalStartingDate: Date,
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
                <tr key={task.taskCode}>
                    <td className="cellSpacer"></td>
                    <td className="codeCell">{task.taskCode}</td>
                    <td className="nameCell">{task.taskName}</td>
                    <DateTableSelectionRow
                        completeDateList={surroundingDates}
                        task={task}
                    />
                </tr>
            );
        }
    );


    return (
        <DateModalContext.Provider value={{
            generalModalData: modalData,
            setGeneralModalData: setModalData
        }}>
            {modalData !== undefined &&
                <AddTaskDateModal
                    generalModalData={modalData}
                    setGeneralModalData={setModalData}
                />
            }
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
