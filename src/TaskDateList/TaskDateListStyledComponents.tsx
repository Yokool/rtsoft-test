import styled, { css } from "styled-components";

export const DefaultCellHeight = 64;

export const BaseCellCSS = css`
    border-style: solid;
    border-color: rgb(197, 197, 197);
    border-width: 1px;
    height: ${DefaultCellHeight + 'px'};
    white-space: pre;
`;

export const CodeCellCommon = css`
    width: 64px;
`

export const NameCellCommon = css`
    width: 256px;
`

export const CellSpacerCommon = css`
    width: 32px;
`

export const TaskTableTH = styled.th`
    ${BaseCellCSS}
    border-bottom-width: 3px;
    border-bottom-color: rgb(0, 0, 0);
`;

export const CellSpacerTH = styled(TaskTableTH)`
     ${CellSpacerCommon}
`


export const TaskTableTD = styled.td`
    ${BaseCellCSS}
`

export const CellSpacerTD = styled(TaskTableTD)`
    ${CellSpacerCommon}
`


export const TaskTableCodeCellTH = styled(TaskTableTH)`
    ${CodeCellCommon}
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
