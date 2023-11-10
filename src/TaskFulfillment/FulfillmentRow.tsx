import React from "react";
import { TaskFulfillment } from "./TaskFulfillment.tsx";
import { dateDayDifference } from "../DateUtils/DateUtils.tsx";

export type FulfillmentRowProps = {
    taskFulfillment: TaskFulfillment
}

export function FulfillmentRow({taskFulfillment} : FulfillmentRowProps): React.JSX.Element {
    
    
    const {startDate, endDate} = taskFulfillment;
    const dateDifference = dateDayDifference(startDate, endDate);
    
    return (
        <div className="fulfillmentRowOuter">
            <p>{taskFulfillment.task.taskName}</p>
        </div>
    );
}