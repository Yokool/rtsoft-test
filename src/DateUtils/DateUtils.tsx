

export function getToday()
{
    return new Date();
}

export function getSurroundingDates(
    startDate: Date,
    datesLeftCount: number,
    datesRightCount: number
) {

    const datesLeft = getSurroundingDatesSingleDirArray(startDate, datesLeftCount, 'backward');
    const datesRight = getSurroundingDatesSingleDirArray(startDate, datesRightCount, 'forward');

    const result = [
        ...datesLeft,
        startDate,
        ...datesRight
    ];

    return result;
}

export type SurroundingDatesShift = 'backward' | 'forward';

export function getSurroundingDatesSingleDirArray(
    date: Date,
    shiftNumber: number,
    shiftDirection: SurroundingDatesShift
) {

    const result: Date[] = [];
    for(let x = 1; x <= shiftNumber; x++)
    {
        const shiftValue = shiftDirection === "backward" ? -x : x;
        let newDate = new Date();
        newDate.setDate(date.getDate() + shiftValue);
        result.push(newDate);
    }

    return result;

}

export function getSurroundingDatesToday(datesLeftCount: number, datesRightCount: number)
{
    return getSurroundingDates(getToday(), datesLeftCount, datesRightCount);
}

export function dateToTableText(date: Date) {
 
}