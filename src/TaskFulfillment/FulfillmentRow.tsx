import React from "react";
import { TaskFulfillment } from "./TaskFulfillment.tsx";

export type FulfillmentRowProps = {
    taskFulfillment: TaskFulfillment
}

export function FulfillmentRow({taskFulfillment} : FulfillmentRowProps): React.JSX.Element {
    return (
        <div className="fulfillmentRowOuter">
            <p>{taskFulfillment.task.taskName}</p>
        </div>
    );
}