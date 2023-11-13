import React, {  } from "react";
import { dateToTableText } from "../../DateUtils/DateUtils";
import { Task } from "../../TaskTypes/Task";
import { TaskFulfillmentParametrized } from "../../TaskFulfillment/TaskFulfillment";
import './DateTableSelectionRow.css';
import { CommonTaskRowCellStyle } from "../CompleteTaskRow/CompleteTaskRow";
import { DateTableSelectionCell } from "./DataTableSelectionCell";

type DateTableSelectionRowProps = {
    completeDateList: Date[]
    task: Task
    commonCellStyle: CommonTaskRowCellStyle
    parameterizedFulfillmentsInThisRow: TaskFulfillmentParametrized[]
    subRowCount: number
    isLastRow: boolean
}

export function DateTableSelectionRow({
    completeDateList,
    task,
    commonCellStyle,
    parameterizedFulfillmentsInThisRow: parameterizedTaskFulfillmentList,
    subRowCount,
    isLastRow
}: DateTableSelectionRowProps): React.JSX.Element {

    // Take the date list and compute the cells
    // out of them.
    const completeDateListJSX = completeDateList.map((date, index) => {
        const key = dateToTableText(date);
        return (
            <DateTableSelectionCell
                key={key}
                date={date}
                task={task}
                commonCellStyle={commonCellStyle}
                parameterizedTaskFulfillmentsInThisRow={parameterizedTaskFulfillmentList}
                subRowCount={subRowCount}
                isLastRow={isLastRow}
            />
        )
    });

    return (
        <>
            {completeDateListJSX}
        </>
    );

}
