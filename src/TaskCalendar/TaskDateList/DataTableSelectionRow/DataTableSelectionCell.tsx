import { useRef, useState, useEffect, useLayoutEffect, useContext } from "react"
import { isDateToday } from "../../../DateUtils/DateUtils"
import { ElementDimensions } from "../../../GeneralTypes/GeneralTypes"
import { FulfillmentRow } from "../../../TaskFulfillment/FulfillmentRow"
import { TaskFulfillmentParametrized, filterParamFulfillmentsByClampedStartDate } from "../../../TaskFulfillment/TaskFulfillment"
import { Task } from "../../../TaskTypes/Task"
import { CommonTaskRowCellStyle } from "../CompleteTaskRow/CompleteTaskRow"
import { DateModalContext } from "../TaskDateList"
import { getWeekendColorOnWeekend, TaskTableTD } from "../TaskDateListStyledComponents"
import './DateTableSelectionRow.css';

export type DateTableSelectionCellProps = {
    date: Date
    task: Task
    commonCellStyle: CommonTaskRowCellStyle
    parameterizedTaskFulfillmentsInThisRow: TaskFulfillmentParametrized[]
    subRowCount: number
    isLastRow: boolean,
}

export function DateTableSelectionCell({
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
