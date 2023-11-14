import styled, { css } from "styled-components";
import { isDateWeekday } from "../../DateUtils/DateUtils";

export const DefaultCellHeight = 64;

export const WeekendColor = 'rgb(220, 220, 220)';

export const TodayColor = 'rgb(255, 0, 0)';

export function getWeekendColorOnWeekend(date: Date)
{
    const isWeekday = isDateWeekday(date);
    const customColor = isWeekday ? WeekendColor : undefined;
    return customColor;
}

export const BaseCellCSS = css`
    border-style: solid;
    border-color: rgb(197, 197, 197);
    border-width: 1px;
    height: ${DefaultCellHeight + 'px'};
    white-space: pre;
`;

export const TaskTable = styled.table`
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
`

export const CodeCellCommon = css`
    width: 96px;
`

export const NameCellCommon = css`
    width: 256px;
`

export const CellSpacerCommon = css`
    width: 32px;
`

export const TaskTableTH = styled.th< { $customBgColor?: string, $isCellToday?: boolean } >`
    ${BaseCellCSS}
    border-bottom-width: 3px;
    border-bottom-color: rgb(0, 0, 0);
    background-color: ${props => props.$customBgColor};


    border-left-width: ${props => props.$isCellToday ? '2px' : undefined};
    border-right-width: ${props => props.$isCellToday ? '2px' : undefined};
    border-top-width: ${props => props.$isCellToday ? '2px' : undefined};
    border-left-color: ${props => props.$isCellToday ? TodayColor : undefined};
    border-right-color: ${props => props.$isCellToday ? TodayColor : undefined};
    border-top-color: ${props => props.$isCellToday ? TodayColor : undefined};
`;

export const CellSpacerTH = styled(TaskTableTH)`
     ${CellSpacerCommon}
`


export const TaskTableTD = styled.td< { $customBgColor?: string, $isCellToday?: boolean, $isLastRow?: boolean} >`
    background-color: ${props => props.$customBgColor};

    ${BaseCellCSS}
    
    border-left-width: ${props => props.$isCellToday ? '2px' : undefined};
    border-right-width: ${props => props.$isCellToday ? '2px' : undefined};
    border-bottom-width: ${props => props.$isCellToday && props.$isLastRow ? '2px' : undefined};
    border-left-color: ${props => props.$isCellToday ? TodayColor : undefined};
    border-right-color: ${props => props.$isCellToday ? TodayColor : undefined};
    border-bottom-color: ${props => props.$isCellToday && props.$isLastRow ? TodayColor : undefined};

`

export const CellSpacerTD = styled(TaskTableTD)`
    ${CellSpacerCommon}
`


export const TaskTableCodeCellTH = styled(TaskTableTH)`
    ${CodeCellCommon}
`

export const TaskTableCodeCellTD = styled(TaskTableTD)`
    ${CodeCellCommon}
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

export const TaskTableNameCellTH = styled(TaskTableTH)`
    ${NameCellCommon}
`

export const TaskTableNameCellTD = styled(TaskTableTD)`
    ${NameCellCommon}
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;


`
