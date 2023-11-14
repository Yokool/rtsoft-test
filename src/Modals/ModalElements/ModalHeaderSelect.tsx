import React from "react";
import './ModalElements.css';


export type ModalHeaderSelectProps = {
    headerText: string
    options: ModalHeaderSelectOption[]
    defaultValue: string | undefined,
    onChange: (newValue: string) => void
}

export type ModalHeaderSelectOption = {
    optionValue: string,
    optionDisplayValue: string,
}

export function ModalHeaderSelect(
    {
        headerText,
        options,
        onChange,
        defaultValue
    }: ModalHeaderSelectProps
): JSX.Element {

    const optionsJSX = options.map((option) => {
        return (
            <option
                key={option.optionValue}
                value={option.optionValue}
                >
                {option.optionDisplayValue}
            </option>
        );
    });

    return (
        <>
            <h1>{headerText}</h1>
            <select defaultValue={defaultValue ?? ''} onChange={(event) => {
                const value = event.currentTarget.value;
                onChange(value);
            }} className="modalMultiSelect">
                <option value="" disabled>---</option>
                {optionsJSX}
            </select>
        </>
    )
}