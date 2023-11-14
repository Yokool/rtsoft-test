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
    dateListStart: Date
    dateListEnd: Date
    taskList: Task[]
    setTaskList: (newList: Task[]) => void
}

export type CommonTaskRowCellStyle = {
    height: number
}

const TaskName = styled.p`
    margin: 0;
    flex: 1;


    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const NameSpacer = styled.div`
    height: 100%;
    width: 24px;
    margin-right: 8px;
`

export function CompleteTaskRow({
    task, surroundingDates, isLastRow, dateListStart, dateListEnd, setTaskList, taskList
}: CompleteTaskRowProps): JSX.Element
{

    const expanded = task.expanded;

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
        const newList = taskList.map((taskVal) => {

            if(taskVal.taskCode !== task.taskCode)
            {
                return taskVal;
            }

            return {
                ...taskVal,
                expanded: !expanded
            }

        });
        
        setTaskList(newList);
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