import React from "react";
import './ModalBase.css';

export type ModalBaseProps = {
    children?: JSX.Element[]
}

export function ModalBase({children}: ModalBaseProps): React.JSX.Element {

    return (
        <div className="modalDarkBackground">
            <div className="center">
                <div className="modalContainer">
                    {children}
                </div>
            </div>
        </div>
    );

}