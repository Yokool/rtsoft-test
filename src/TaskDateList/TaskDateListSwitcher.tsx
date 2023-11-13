import React, { ChangeEvent, useRef } from "react";
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
    width: 256px;
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
    width: 256px;
    height: 64px;
    visibility: hidden;
`;

const DateShownText = styled.p`
    flex: 1;
    text-align: center;
    vertical-align: middle;
    margin: 0;
    font-size: 24px;
`

export type TaskDateListSwitcherProps = {
    date: Date,
    setDate: (newDate: Date) => void
}

export function TaskDateListSwitcher( {date, setDate} : TaskDateListSwitcherProps ): JSX.Element
{

    const dateInputRef = useRef<HTMLInputElement>(null);

    function handleOuterClick() {
        dateInputRef.current?.showPicker();
    }

    function handleDateInputChange(event: ChangeEvent<HTMLInputElement>) {
        const newDate = event.currentTarget.valueAsDate;

        if(newDate === null)
        {
            return;
        }

        setDate(newDate);
    }

    const displayText = getDisplayTextForCustomDate(date);


    return (
        <SwitcherOuterHolder>
            <DoubleArrowIcon arrowDirection="left" />
            <ArrowIcon arrowDirection="left" />

            <DateInputOuter onClick={handleOuterClick}>
                <DateInputWrapper>
                    <DateInput onChange={handleDateInputChange} ref={dateInputRef} className="calendarInput" type="date" />
                </DateInputWrapper>
                
                <DateInnerWrapper>
                    <DateShownText>{displayText}</DateShownText>
                    <DropDownIcon style={{
                        justifySelf: 'flex-end'
                    }} />
                </DateInnerWrapper>

                </DateInputOuter>
            
            <ArrowIcon arrowDirection="right" />
            <DoubleArrowIcon arrowDirection="right" />
        </SwitcherOuterHolder>
    )
}


function getDisplayTextForCustomDate(date: Date)
{
    return date.toLocaleString('cs-CZ', {
        month: 'long',
        year: 'numeric'
    })
}
