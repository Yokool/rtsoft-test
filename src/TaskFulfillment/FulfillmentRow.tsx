import React, { useContext } from "react";
import { TaskFulfillment, TaskFulfillmentIntoStyles, TaskFulfillmentParametrized } from "./TaskFulfillment";
import { dateUnitDayDifference } from "../DateUtils/DateUtils";
import './FulfillmentRow.css';
import { ElementDimensions } from "../GeneralTypes/GeneralTypes";
import styled from "styled-components";
import { DateModalContext } from "../TaskDateList/TaskDateList";

export type FulfillmentRowProps = {
    taskFulfillment: TaskFulfillmentParametrized
    parentCellDimensions: ElementDimensions
    subRowCount: number
}

export const FulfillmentRowHeightOffset = 12; 

const FulfillmentRowOuter = styled.div< {
    $backgroundColor: string,
    $hoverBgColor: string,
    $width: number,
    $height: number,
    $foregroundColor: string,
    $foregroundHoverColor: string,
    $topOffset: number,
} > `
    width: ${props => props.$width + "px"};
    height: ${props => props.$height + "px"};
    top: ${props => props.$topOffset + "px"};
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    
    background-color: ${props => props.$backgroundColor};
    color: ${props => props.$foregroundColor};

    &:hover {
        background-color: ${props => props.$hoverBgColor};
        color: ${props => props.$foregroundHoverColor};
        cursor: pointer;
    }

    div svg {
        stroke: ${props => props.$foregroundColor}
    }

    &:hover div svg {
        stroke: ${props => props.$foregroundHoverColor};
    }

    &:hover p {
        color: ${props => props.$foregroundHoverColor};
    }
    
`;

const FulfillmentText = styled.p< {
    $color: string
} > `
    color: ${props => props.$color};
    margin-left: 8px;
    height: 24px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: bold;
`;

export function FulfillmentRow({taskFulfillment, parentCellDimensions, subRowCount} : FulfillmentRowProps): React.JSX.Element {
    
    
    
    const {task, clampedStartDate, clampedEndDate} = taskFulfillment;
    const {taskName} = task;

    const associatedStyle = TaskFulfillmentIntoStyles[taskFulfillment.status];

    const modalContext = useContext(DateModalContext);

    // add 1 since we need to show the
    // fulfillment row even when the task goes from today (0:00) to today (23:59)
    const dateDifference = dateUnitDayDifference(clampedStartDate, clampedEndDate) + 1;
    
    const parentCellWidth = parentCellDimensions.width;
    const parentCellHeight = parentCellDimensions.height;

    const fulfillmentRowWidth = parentCellWidth * dateDifference;
    
    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        
        modalContext.setGeneralModalData({
            dateAddTask: taskFulfillment.task,
            editedTaskFulfillment: taskFulfillment,
            modalStartingDate: taskFulfillment.startDate,
            modalInitialEndDate: taskFulfillment.endDate,
            modalInitialStatus: taskFulfillment.status,
        });
        // since the fulfillment row is contained within the cell
        // normally the event would propagate back up to the parent
        // and this would be registered as adding another task fulfillment
        event.stopPropagation();
    }

    const fulfillmentRowOuterWidth = fulfillmentRowWidth;

    const fulfillmentRowOuterHeight = (parentCellHeight - FulfillmentRowHeightOffset) / subRowCount;
    const topOffset = fulfillmentRowOuterHeight * taskFulfillment.subRow;
    
    return (
        <div className="fulfillmentRowContainer" onClick={handleClick}>
            <FulfillmentRowOuter
                $backgroundColor={associatedStyle.fulfillmentBgColor}
                $hoverBgColor={associatedStyle.fulfillmentBgHoverColor}
                $width={fulfillmentRowOuterWidth}
                $height={fulfillmentRowOuterHeight}
                $foregroundColor={associatedStyle.fulfillmentForegroundColor}
                $foregroundHoverColor={associatedStyle.fulfillmentForegroundHoverColor}
                $topOffset={topOffset}
                >
                <div className="fulfillmentIconHolder">
                    {associatedStyle.fulfillmentIcon}
                </div>
                
                <FulfillmentText $color={associatedStyle.fulfillmentForegroundColor}>
                    {taskName}
                </FulfillmentText>

            </FulfillmentRowOuter>
        </div>
    );
}