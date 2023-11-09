import React from "react";
import './ModalElements.css';

export type ModalHeaderInputProps = {
    header: string
    inputValue: string
    setInputValue: (newValue: string) => void
}

export function ModalHeaderInput({
    header,
    inputValue,
    setInputValue
}: ModalHeaderInputProps): React.JSX.Element {
    return (
        <>
            <h1>{header}</h1>
            <input
                className="modalText"
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.currentTarget.value)}
            />
        </>
    );
}

export type ModalSubmitProps = {
    submitText: string
    onSubmit: () => void
}

export function ModalSubmit({
    submitText,
    onSubmit
}: ModalSubmitProps): React.JSX.Element {

    return (
    <button
        className="modalSubmit"
        onClick={onSubmit}
    >
        {submitText}
    </button>
    );
    
}

export type ModalHeaderDateProps = {
    headerText: string
    date: Date | undefined,
    setDate: (newDate: Date) => void
}

export function ModalHeaderDate(
    {
        headerText,
        date,
        setDate
    }: ModalHeaderDateProps
): React.JSX.Element {

    const dateValue = date?.toISOString().split("T")[0];

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
                    
                    if(date === null)
                    {
                        throw new Error("")
                    }

                    setDate(date);
                }}
            />
        </>
    )
}

export type ModalHeaderSelectProps = {
    headerText: string
    options: string[]
}

export function ModalHeaderSelect(
    {
        headerText,
        options
    }: ModalHeaderSelectProps
): JSX.Element {

    const optionsJSX = options.map((option) => {
        return (
            <option key={option}>
                {option}
            </option>
        );
    });

    return (
        <>
            <h1>{headerText}</h1>
            <select className="modalMultiSelect">
                {optionsJSX}
            </select>
        </>
    )
}