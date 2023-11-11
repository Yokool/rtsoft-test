import { error } from "console";
import React from "react";
import { ModalSubmit } from "../ModalElements";

export type ErrorModalBaseProps = {
    children?: JSX.Element[],
    errorMessage: string | undefined,
    setErrorMessage: (errorMessage: string | undefined) => void
}


export function ErrorModalBase({
    children,
    errorMessage,
    setErrorMessage
}: ErrorModalBaseProps): React.JSX.Element {

    
    return (
        <div className="modalDarkBackground">
            <div className="center">
                <div className="modalContainer" style={{
                    display: errorMessage === undefined ? 'flex' : 'none'
                    }}>
                    {children}
                </div>


                {errorMessage !== undefined && (
                    <div className="modalContainer">
                        <h1>{errorMessage}</h1>
                        <ModalSubmit
                            submitText="OK"
                            onSubmit={() => {
                                setErrorMessage(undefined);
                            }}
                        />
                    </div>
                )}

            </div>
        </div>
    );

}