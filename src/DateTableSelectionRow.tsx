import React, { useContext } from "react";
import { dateToTableText } from "./DateUtils/DateUtils.tsx";
import { Task } from "./TaskTypes/Task.tsx";
import { DateModalContext } from "./TaskDateList/TaskDateList.tsx";
import { TaskFulfillmentContext, getAssociatedFulfillmentsToStartDate, getAssociatedFulfillmentsToTask } from "./TaskFulfillment/TaskFulfillment.tsx";
import { FulfillmentRow } from "./TaskFulfillment/FulfillmentRow.tsx";


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

    const associatedTasksJSX = associatedTaskFulfillments?.map((
        taskFulfillment
    ) => {
        return (
            <FulfillmentRow
                key={taskFulfillment.task.taskCode + ' ' + taskFulfillment.startDate.toISOString()}
                taskFulfillment={taskFulfillment}
            />
        );
    })



    const {
        setModalTask,
        setModalStartingDate
    } = useContext(DateModalContext)

    function handleCellClick() {
        setModalTask(task);
        setModalStartingDate(date);
    }


    return (
        <td
            onClick={handleCellClick}
        >
            {associatedTasksJSX}
        </td>
    )

}
