

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
        const shiftValue = shiftDirection === 'backward' ? -x : x;
        let newDate = new Date();
        newDate.setDate(date.getDate() + shiftValue);
        result.push(newDate);
    }

    if(shiftDirection === 'backward')
    {
        result.reverse();
    }

    return result;

}

export function getSurroundingDatesToday(datesLeftCount: number, datesRightCount: number)
{
    const todayStart = getToday();
    todayStart.setHours(0, 0, 0, 0);

    return getSurroundingDates(todayStart, datesLeftCount, datesRightCount);
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

export function dateUnitDayDifference(date1: Date, date2: Date)
{
    // We don't want to worry about hours affecting our
    // result -> so lets equalize the hours and only worry about dates
    // wihtou e.g. when computing the day difference between today (10.11. 14:00) and
    // tomorrow (11.11. 13:00) would get a diff of 0
    const [date1Normalized, date2Normalized] = normalizeDates(date1, date2);

    const diff = Math.abs(date2Normalized.getTime() - date1Normalized.getTime());
    
    // rounding is not 100% necessary if we are normalizing to 00:00:00.00
    // but it's useful to keep
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    
    return diffDays;
}

export function normalizeDate(date: Date)
{
    const dateNormalized = new Date(date);
    dateNormalized.setHours(0, 0, 0, 0);
    return dateNormalized;
}

export function normalizeDates(...dates: Date[])
{
    return dates.map((date) => {
        return normalizeDate(date);
    });
}

export function isDate2LargerThanDate1ByDays(date1: Date, date2: Date)
{
    const [date1Normalized, date2Normalized] = normalizeDates(date1, date2);

    return date2Normalized.getTime() >= date1Normalized.getTime();
}