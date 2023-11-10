import React from "react";
import { TaskFulfillment } from "./TaskFulfillment.tsx";
import { dateDayDifference } from "../DateUtils/DateUtils.tsx";
import './FulfillmentRow.css';
import { ElementDimensions } from "../GeneralTypes.tsx";

export type FulfillmentRowProps = {
    taskFulfillment: TaskFulfillment
    parentCellDimensions: ElementDimensions
}

export function FulfillmentRow({taskFulfillment, parentCellDimensions} : FulfillmentRowProps): React.JSX.Element {
    
    
    const {startDate, endDate} = taskFulfillment;
    const dateDifference = dateDayDifference(startDate, endDate);
    
    const parentCellWidth = parentCellDimensions.width;
    const parentCellHeight = parentCellDimensions.height;

    return (
        <div className="fulfillmentRowContainer">
            <div className="fulfillmentRowOuter" style={{
                width: parentCellWidth,
                height: parentCellHeight,
                bottom: parentCellHeight / 2
            }}>
                A
            </div>
        </div>
    );
}