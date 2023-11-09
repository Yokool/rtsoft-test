import React from "react";


type DateTableSelectionRowProps = {
    completeDateList: Date[]
}

export function DateTableSelectionRow({
    completeDateList
}: DateTableSelectionRowProps): React.JSX.Element {


    const completeDateListJSX = completeDateList.map((date) => {
        return (
            <td>
                FILLER
            </td>
        )
    });

    console.log("ay");

    console.log(completeDateListJSX);

    return (
        <>
            {completeDateListJSX}
        </>
    );

}
