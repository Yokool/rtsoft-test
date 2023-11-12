import styled, { css } from "styled-components";

export const BaseCellCSS = css`
    border-style: solid;
    border-color: rgb(197, 197, 197);
    border-width: 1px;
    height: 64px;
    white-space: pre;
`;

export const CodeCellCommon = css`
    width: 64px;
`

export const NameCellCommon = css`
    width: 256px;
`

export const CellSpacerCommon = css`
    ${BaseCellCSS}
    width: 32px;
`

export const CellSpacerTD = styled.td`
    ${CellSpacerCommon}
`

export const CellSpacerTH = styled.th`
     ${CellSpacerCommon}
`

export const TaskTableTH = styled.th`
    ${BaseCellCSS}
    border-bottom-width: 3px;
    border-bottom-color: rgb(0, 0, 0);
`;

export const TaskTableCodeCellTH = styled(TaskTableTH)`
    ${CodeCellCommon}
`

export const TaskTableTD = styled.td`
    ${BaseCellCSS}
`
export const TaskTableCodeCellTD = styled(TaskTableTD)`
    ${CodeCellCommon}
`

export const TaskTableNameCellTH = styled(TaskTableTH)`
    ${NameCellCommon}
`

export const TaskTableNameCellTD = styled(TaskTableTD)`
    ${NameCellCommon}
`
