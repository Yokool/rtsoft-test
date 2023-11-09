import React from "react";
import { dateToTableText } from "./DateUtils/DateUtils.tsx";
import { Task } from "./TaskTypes/Task.tsx";


type DateTableSelectionRowProps = {
    completeDateList: Date[]
    task: Task
}

export function DateTableSelectionRow({
    completeDateList,
    task
}: DateTableSelectionRowProps): React.JSX.Element {

    const completeDateListJSX = completeDateList.map((date) => {
        const key = dateToTableText(date);
        return (
            <DateTableSelectionCell
                key={key}
                date={date}
                task={task}
            />
        )
    });

    return (
        <>
            {completeDateListJSX}
        </>
    );

}

type DateTableSelectionCellProps = {
    date: Date
    task: Task
}

function DateTableSelectionCell({
    date,
    task
}: DateTableSelectionCellProps): React.JSX.Element {


    function handleCellClick() {
        
    }


    return (
        <td
            onClick={handleCellClick}
        >
        </td>
    )

}
