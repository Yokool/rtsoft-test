import React from "react";
import { TaskFulfillment, TaskFulfillmentIntoStyles } from "./TaskFulfillment.tsx";
import { dateUnitDayDifference } from "../DateUtils/DateUtils.tsx";
import './FulfillmentRow.css';
import { ElementDimensions } from "../GeneralTypes.tsx";
import styled from "styled-components";

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

    const fulfillmentRowOuterWidth = fulfillmentRowWidth;
    const fulfillmentRowOuterHeight = parentCellHeight - FulfillmentRowHeightOffset;
    console.log(taskName);
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
                    {associatedStyle.fulfillmentIcon}
                </div>
                
                <FulfillmentText $color={associatedStyle.fulfillmentForegroundColor}>
                    {taskName}
                </FulfillmentText>

            </FulfillmentRowOuter>
        </div>
    );
}