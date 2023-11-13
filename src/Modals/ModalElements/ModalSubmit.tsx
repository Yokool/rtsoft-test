import React from "react";
import './ModalElements.css';


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
