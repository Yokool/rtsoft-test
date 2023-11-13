import React, { useRef } from "react";
import styled from "styled-components";
import { DoubleArrowIcon } from "../Icons/DoubleArrow";
import { ArrowIcon } from "../Icons/ArrowIcon";
import { DropDownIcon } from "../Icons/DropDownIcon";

const SwitcherOuterHolder = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const DateInputOuter = styled.div`
    width: 128px;
    height: 64px;
    margin-left: 24px;
    margin-right: 24px;
    &:hover {
        cursor: pointer;
    }

`

const DateInputWrapper = styled.div`
    position: relative;
    width: 0;
    height: 0;
`

const DateInnerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const DateInput = styled.input`
    position: relative;
    padding: 0;
    border: 0;
    width: 128px;
    height: 64px;
    visibility: hidden;
`;

const DateShownText = styled.p`
    flex: 1;
    text-align: center;
    vertical-align: middle;
    padding: 0;
    font-size: 24px;
`

export function TaskDateListSwitcher(): JSX.Element
{
    return (
        <SwitcherOuterHolder>
            <DoubleArrowIcon arrowDirection="left" />
            <ArrowIcon arrowDirection="left" />
            <CustomDateInput />
            <ArrowIcon arrowDirection="right" />
            <DoubleArrowIcon arrowDirection="right" />
        </SwitcherOuterHolder>
    )
}

export function CustomDateInput(): JSX.Element
{

    const dateInputRef = useRef<HTMLInputElement>(null);

    function handleOuterClick() {
        dateInputRef.current?.showPicker();
    }

    return (
        <DateInputOuter onClick={handleOuterClick}>
            <DateInputWrapper>
                <DateInput ref={dateInputRef} className="calendarInput" type="date" />
            </DateInputWrapper>
            
            <DateInnerWrapper>
                <DateShownText>aa</DateShownText>
                <DropDownIcon style={{
                    justifySelf: 'flex-end'
                }} />
            </DateInnerWrapper>

        </DateInputOuter>
    );
}