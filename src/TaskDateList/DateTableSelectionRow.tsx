import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { dateToTableText, isDateToday } from "../DateUtils/DateUtils";
import { Task } from "../TaskTypes/Task";
import { DateModalContext } from "./TaskDateList";
import { TaskFulfillmentParametrized, filterParamFulfillmentsByClampedStartDate, getAssociatedFulfillmentsToStartDate, safeCastToParameterizedFulfillmentListVersion } from "../TaskFulfillment/TaskFulfillment";
import { FulfillmentRow } from "../TaskFulfillment/FulfillmentRow";
import { ElementDimensions } from "../GeneralTypes";
import './DateTableSelectionRow.css';
import { TaskTableTD, getWeekendColorOnWeekend } from "./TaskDateListStyledComponents";
import { CommonTaskRowCellStyle } from "./CompleteTaskRow";

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

type DateTableSelectionCellProps = {
    date: Date
    task: Task
    commonCellStyle: CommonTaskRowCellStyle
    parameterizedTaskFulfillmentsInThisRow: TaskFulfillmentParametrized[]
    subRowCount: number
    isLastRow: boolean,
}

function DateTableSelectionCell({
    date,
    task,
    commonCellStyle,
    parameterizedTaskFulfillmentsInThisRow,
    subRowCount,
    isLastRow
}: DateTableSelectionCellProps): React.JSX.Element {

    //const associatedTaskFulfillmentsUncast = getAssociatedFulfillmentsToStartDate(task, date, parameterizedTaskFulfillmentsInThisRow);
    
    // better to use an additional check even though we can safely
    // say that this should never fail
    //const associatedTaskFulfillments = safeCastToParameterizedFulfillmentListVersion(associatedTaskFulfillmentsUncast);
    const associatedTaskFulfillments = filterParamFulfillmentsByClampedStartDate(parameterizedTaskFulfillmentsInThisRow, date);
    

    const cellRef = useRef<HTMLTableCellElement>(null);
    const [cellDimensions, setCellDimensions] = useState<ElementDimensions>({
        width: 0,
        height: 0
    })

    useEffect(() => {
        if(cellRef.current === null)
        {
            return;
        }
        
        const resizeObserver = new ResizeObserver(() => {
            updateCellSizeForChildren();
        });

        resizeObserver.observe(cellRef.current);
        return () => {
            resizeObserver.disconnect();
        }
    }, [])

    function updateCellSizeForChildren()
    {
        if(cellRef.current === null)
        {
            return;
        }

        const boundingRect = cellRef.current.getBoundingClientRect();
        const cellWidth = boundingRect.width;
        
        const cellHeight = boundingRect.height;
        setCellDimensions({
            width: cellWidth,
            height: cellHeight
        });
    }

    useLayoutEffect(() => {
        updateCellSizeForChildren();
    }, [])

    const associatedTasksJSX = associatedTaskFulfillments?.map((
        taskFulfillment
    ) => {
        return (
            <FulfillmentRow
                key={taskFulfillment.uuid}
                taskFulfillment={taskFulfillment}
                parentCellDimensions={cellDimensions}
                subRowCount={subRowCount}
            />
        );
    })

    const {
        setGeneralModalData
    } = useContext(DateModalContext);

    function handleCellClick() {
        // When you click a cell, open up the modal
        // to add new fulfillment for the task this cell
        // belongs to starting on the date of this cell
        setGeneralModalData({
            dateAddTask: task,
            modalStartingDate: date
        });
    }


    const customColor = getWeekendColorOnWeekend(date);
    const isCellToday = isDateToday(date);

    return (
        <TaskTableTD
            style={commonCellStyle}
            ref={cellRef}
            onClick={handleCellClick}
            $customBgColor={customColor}
            $isCellToday={isCellToday}
            $isLastRow={isLastRow}
        >
            {associatedTasksJSX}

            <div className="dateCellInner" />
        </TaskTableTD>
    )

}
