import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { dateToTableText } from "./DateUtils/DateUtils.tsx";
import { Task } from "./TaskTypes/Task.tsx";
import { DateModalContext } from "./TaskDateList/TaskDateList.tsx";
import { TaskFulfillmentContext, getAssociatedFulfillmentsToStartDate, getAssociatedFulfillmentsToTask } from "./TaskFulfillment/TaskFulfillment.tsx";
import { FulfillmentRow } from "./TaskFulfillment/FulfillmentRow.tsx";
import { ElementDimensions } from "./GeneralTypes.tsx";

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
    task,
}: DateTableSelectionCellProps): React.JSX.Element {


    // Find all the fulfillments for this start date
    const fulfillmentList = useContext(TaskFulfillmentContext)
    const associatedTaskFulfillments = getAssociatedFulfillmentsToStartDate(task, date, fulfillmentList);

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

        const cellWidth = cellRef.current.offsetWidth;
        const cellHeight = cellRef.current.offsetHeight;
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
                key={taskFulfillment.task.taskCode + ' ' + taskFulfillment.startDate.toISOString()}
                taskFulfillment={taskFulfillment}
                parentCellDimensions={cellDimensions}
            />
        );
    })



    const {
        setModalTask,
        setModalStartingDate
    } = useContext(DateModalContext)

    function handleCellClick() {
        setModalTask(task);
        console.log(date);
        setModalStartingDate(date);
    }


    return (
        <td
            ref={cellRef}
            onClick={handleCellClick}
        >
            {associatedTasksJSX}
        </td>
    )

}
