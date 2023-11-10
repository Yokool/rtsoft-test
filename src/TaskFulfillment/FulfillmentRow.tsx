import React from "react";
import { TaskFulfillment } from "./TaskFulfillment.tsx";
import { dateUnitDayDifference } from "../DateUtils/DateUtils.tsx";
import './FulfillmentRow.css';
import { ElementDimensions } from "../GeneralTypes.tsx";

export type FulfillmentRowProps = {
    taskFulfillment: TaskFulfillment
    parentCellDimensions: ElementDimensions
}

export function FulfillmentRow({taskFulfillment, parentCellDimensions} : FulfillmentRowProps): React.JSX.Element {
    
    
    const {startDate, endDate} = taskFulfillment;

    // add 1 since we need to show the
    // fulfillment row even when the task goes from today (0:00) to today (23:59)
    const dateDifference = dateUnitDayDifference(startDate, endDate) + 1;
    
    const parentCellWidth = parentCellDimensions.width;
    const parentCellHeight = parentCellDimensions.height;

    const fulfillmentRowWidth = parentCellWidth * dateDifference;
    
    return (
        <div className="fulfillmentRowContainer">
            <div className="fulfillmentRowOuter" style={{
                width: fulfillmentRowWidth,
                height: parentCellHeight,
                bottom: parentCellHeight / 2
            }}>
                A
            </div>
        </div>
    );
}