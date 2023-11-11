import React from "react";
import { TaskFulfillment, TaskFulfillmentIntoStyles } from "./TaskFulfillment.tsx";
import { dateUnitDayDifference } from "../DateUtils/DateUtils.tsx";
import './FulfillmentRow.css';
import { ElementDimensions } from "../GeneralTypes.tsx";

export type FulfillmentRowProps = {
    taskFulfillment: TaskFulfillment
    parentCellDimensions: ElementDimensions
}

export const FulfillmentRowHeightOffset = 12; 

export function FulfillmentRow({taskFulfillment, parentCellDimensions} : FulfillmentRowProps): React.JSX.Element {
    
    
    const {task, startDate, endDate} = taskFulfillment;
    const {taskName} = task;

    const associatedStyle = TaskFulfillmentIntoStyles[taskFulfillment.status];

    // add 1 since we need to show the
    // fulfillment row even when the task goes from today (0:00) to today (23:59)
    const dateDifference = dateUnitDayDifference(startDate, endDate) + 1;
    
    const parentCellWidth = parentCellDimensions.width;
    const parentCellHeight = parentCellDimensions.height;

    const fulfillmentRowWidth = parentCellWidth * dateDifference;
    
    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        
        // since the fulfillment row is contained within the cell
        // normally the event would propagate back up to the parent
        // and this would be registered as adding another task fulfillment
        event.stopPropagation();
    }

    return (
        <div className="fulfillmentRowContainer" onClick={handleClick}>
            <div className="fulfillmentRowOuter" style={{
                width: fulfillmentRowWidth,
                // leave some space under the task to be able to add another on
                // the same date
                height: parentCellHeight - FulfillmentRowHeightOffset,
                backgroundColor: associatedStyle.fulfillmentColor
            }}>
                <p className="fulfillmentName">
                    {taskName}
                </p>
            </div>
        </div>
    );
}