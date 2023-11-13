import React from "react";
import styled from "styled-components";
import { DoubleArrowIcon } from "../Icons/DoubleArrow";
import { ArrowIcon } from "../Icons/ArrowIcon";

const SwitcherOuterHolder = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const DateInput = styled.input`
    background-color: #ffffff;
    border-style: none;
    font-size: 24px;
    padding-left: 16px;
    padding-right: 8px;

    // only for chrome
    &::-webkit-calendar-picker-indicator {
        background-image: url('DropDownIcon.svg');
    }
`;

export function TaskDateListSwitcher(): JSX.Element
{
    return (
        <SwitcherOuterHolder>
            <DoubleArrowIcon arrowDirection="left" />
            <ArrowIcon arrowDirection="left" />
            <DateInput className="calendarInput" type="date"></DateInput>
            <ArrowIcon arrowDirection="right" />
            <DoubleArrowIcon arrowDirection="right" />
        </SwitcherOuterHolder>
    )
}