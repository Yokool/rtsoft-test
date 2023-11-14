import { useContext, useState } from "react";
import { DateTableSelectionRow } from "../DataTableSelectionRow/DateTableSelectionRow";
import { Task, taskHasChildren } from "../../../TaskTypes/Task";
import { TaskFulfillmentContext, addRowParameterToEachFulfillment, clampTaskfulfillmentsToDates, getAssociatedFulfillmentsToTask } from "../../../TaskFulfillment/TaskFulfillment";
import { CellSpacerTD, DefaultCellHeight, TaskTableCodeCellTD, TaskTableNameCellTD } from "../TaskDateListStyledComponents";
import { MinusFrameIcon } from "../../../Icons/MinusFrameIcon";
import { PlusFrameIcon } from "../../../Icons/PlusFrameIcon";
import styled from "styled-components";

export type CompleteTaskRowProps = {
    task: Task
    surroundingDates: Date[]
    isLastRow: boolean
    dateListStart: Date,
    dateListEnd: Date
}

export type CommonTaskRowCellStyle = {
    height: number
}

const TaskName = styled.p`
    margin: 0;
    flex: 1;
`;

const NameSpacer = styled.div`
    height: 100%;
    width: 24px;
    margin-right: 8px;
`

export function CompleteTaskRow({
    task, surroundingDates, isLastRow, dateListStart, dateListEnd
}: CompleteTaskRowProps): JSX.Element
{

    const [expanded, setExpanded] = useState(false);

    const taskFulfillmentList = useContext(TaskFulfillmentContext);
    const fulfillmentsInThisRow = getAssociatedFulfillmentsToTask(task, taskFulfillmentList);

    const {taskfulfillmentsParameterized, subrowCount} = addRowParameterToEachFulfillment(fulfillmentsInThisRow);
    const taskfulfillmentsParameterizedClamped = clampTaskfulfillmentsToDates(taskfulfillmentsParameterized, dateListStart, dateListEnd);

    // Either use the default when no tasks have been added
    // or make enough space for all the tasks
    const commonHeight = subrowCount === 0 ? DefaultCellHeight : (subrowCount * DefaultCellHeight)
    const commonHeightStyle: CommonTaskRowCellStyle = {
        height: commonHeight
    }


    const taskHasChildrenCheck = taskHasChildren(task);

    function handlePlusMinusIconClick()
    {
        setExpanded(!expanded);
    }

    const iconStyles = {
        marginLeft: 8,
        cursor: 'pointer'
    };

    const ExpandIconJSX = (
        expanded ?
        <MinusFrameIcon
            style={iconStyles}
            onClick={handlePlusMinusIconClick}
        />
        :
        <PlusFrameIcon
            style={iconStyles}
            onClick={handlePlusMinusIconClick}
        />
    )

    return (<tr key={task.taskCode}>
        <CellSpacerTD style={commonHeightStyle}></CellSpacerTD>
        <TaskTableCodeCellTD
            style={commonHeightStyle}>
                {task.taskCode}
            </TaskTableCodeCellTD>
        <TaskTableNameCellTD
            style={commonHeightStyle}>
                {taskHasChildrenCheck && ExpandIconJSX}
                
                <TaskName>
                    {task.taskName}
                </TaskName>

                {taskHasChildrenCheck && <NameSpacer />}
        </TaskTableNameCellTD>
        <DateTableSelectionRow
            completeDateList={surroundingDates}
            task={task}
            commonCellStyle={commonHeightStyle}
            parameterizedFulfillmentsInThisRow={taskfulfillmentsParameterizedClamped}
            subRowCount={subrowCount}
            isLastRow={isLastRow}
        />
    </tr>)
}