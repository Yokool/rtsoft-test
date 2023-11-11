import React from "react";
import { TaskFulfillment, TaskFulfillmentIntoStyles, TaskFulfillmentStatus } from "./TaskFulfillment.tsx";
import { dateUnitDayDifference } from "../DateUtils/DateUtils.tsx";
import './FulfillmentRow.css';
import { ElementDimensions } from "../GeneralTypes.tsx";
import { DoneIcon } from "../Icons/DoneIcon.tsx";
import styled from "styled-components";
import { HourglassIcon } from "../Icons/HourglassIcon.tsx";

export type FulfillmentRowProps = {
    taskFulfillment: TaskFulfillment
    parentCellDimensions: ElementDimensions
}

export const FulfillmentRowHeightOffset = 12; 

const FulfillmentRowOuter = styled.div< {
    $backgroundColor: string,
    $hoverBgColor: string,
    $width: number,
    $height: number,
    $foregroundColor: string,
    $foregroundHoverColor: string,
} > `
    width: ${props => props.$width + "px"};
    height: ${props => props.$height + "px"};
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    
    background-color: ${props => props.$backgroundColor};
    color: ${props => props.$foregroundColor};

    &:hover {
        background-color: ${props => props.$hoverBgColor};
        color: ${props => props.$foregroundHoverColor};
        fill: black;
    }
    
`;

export function FulfillmentRow({taskFulfillment, parentCellDimensions} : FulfillmentRowProps): React.JSX.Element {
    
    
    const {task, startDate, endDate} = taskFulfillment;
    const {taskName} = task;

    const associatedStyle = TaskFulfillmentIntoStyles[taskFulfillment.status];


    const fulfillmentIconMap: Record<TaskFulfillmentStatus, JSX.Element> = {
        done: <DoneIcon iconColor={associatedStyle.fulfillmentForegroundColor} />,
        waiting: <HourglassIcon iconColor={associatedStyle.fulfillmentForegroundColor} />
    }

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

    const fulfillmentRowOuterWidth = fulfillmentRowWidth;
    const fulfillmentRowOuterHeight = parentCellHeight - FulfillmentRowHeightOffset;

    const fulfillmentIcon = fulfillmentIconMap[taskFulfillment.status];
    
    return (
        <div className="fulfillmentRowContainer" onClick={handleClick}>
            <FulfillmentRowOuter
                $backgroundColor={associatedStyle.fulfillmentBgColor}
                $hoverBgColor={associatedStyle.fulfillmentBgHoverColor}
                $width={fulfillmentRowOuterWidth}
                $height={fulfillmentRowOuterHeight}
                $foregroundColor={associatedStyle.fulfillmentForegroundColor}
                $foregroundHoverColor={associatedStyle.fulfillmentForegroundHoverColor}
                >
                <div className="fulfillmentIconHolder">
                    {fulfillmentIcon}
                </div>
                
                <p className="fulfillmentName">
                    {taskName}
                </p>

            </FulfillmentRowOuter>
        </div>
    );
}