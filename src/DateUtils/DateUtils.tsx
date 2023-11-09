

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
    // hard-coded to czech locale for now
    const locale = 'cs-CZ';
    
    let localeWeekDay = date.toLocaleDateString(locale, {
        weekday: 'short',
    });

    let dateNum = date.toLocaleString(locale, {
        day: '2-digit',
        month: '2-digit',
    })

    if(localeWeekDay.length < 2)
    {
        throw new Error(`Expected string ${localeWeekDay} to be of size 2. Only cs-CZ locale is supported as of now.`);
    }

    localeWeekDay = localeWeekDay[0].toUpperCase() + localeWeekDay[1];

    const result = localeWeekDay + "\n" + dateNum;
    return result;
}