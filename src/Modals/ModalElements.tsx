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