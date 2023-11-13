import React from "react";
import './ModalElements.css';
import { turnDateToInputValue } from "../../DateUtils/DateUtils";


export type ModalHeaderDateProps = {
    headerText: string
    date: Date | undefined,
    setDate: (newDate: Date | undefined) => void
}

export function ModalHeaderDate(
    {
        headerText,
        date,
        setDate
    }: ModalHeaderDateProps
): React.JSX.Element {

    const dateValue = turnDateToInputValue(date);

    return (
        <>
            <h1>
                {headerText}
            </h1>
            <input
                className="modalDate"
                type="date"
                value={dateValue || ''}
                onChange={(event) => {
                    const date = event.currentTarget.valueAsDate;
                    setDate(date === null ? undefined : date);
                }}
            />
        </>
    )
}
