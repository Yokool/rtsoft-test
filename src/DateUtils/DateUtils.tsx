
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

export function getImmediateNextDay(date: Date, shiftDirection: SurroundingDatesShift)
{
    return getShiftedDate(date, shiftDirection, 1);
}

export function getImmediateNextMonth(date: Date, shiftDirection: SurroundingDatesShift)
{
    return getShiftedDateByMonth(date, shiftDirection, 1);
}

export function getShiftedDateByMonth(date: Date, shiftDirection: SurroundingDatesShift, shiftCount: number)
{
    const shiftValue = shiftDirection === 'backward' ? -shiftCount : shiftCount;
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + shiftValue);
    
    return newDate;
}

export function turnDateToInputValue(date: Date | undefined)
{
    const result = date?.toISOString().split("T")[0];
    return result;
}

export function getShiftedDate(date: Date, shiftDirection: SurroundingDatesShift, shiftCount: number)
{
    const shiftValue = shiftDirection === 'backward' ? -shiftCount : shiftCount;
    const newDate = normalizeDate(new Date(date));
    
    newDate.setDate(date.getDate() + shiftValue);
    
    return newDate;
}

export function getSurroundingDatesSingleDirArray(
    date: Date,
    shiftNumber: number,
    shiftDirection: SurroundingDatesShift
) {


    const result: Date[] = [];
    for(let x = 1; x <= shiftNumber; x++)
    {
        const newDate = getShiftedDate(date, shiftDirection, x);
        result.push(newDate);
    }

    if(shiftDirection === 'backward')
    {
        result.reverse();
    }

    return result;

}

export function clampDate(date: Date, start: Date, end: Date)
{
    const dateTime = date.getTime();
    const startTime = start.getTime();
    const endTime = end.getTime();

    if(dateTime < startTime)
    {
        return start;
    }
    else if(dateTime > endTime)
    {
        return end;
    }
    else
    {
        return date;
    }
}

/*
export function getSurroundingDatesToday(datesLeftCount: number, datesRightCount: number)
{
    const todayStart = getToday();
    todayStart.setHours(0, 0, 0, 0);

    return getSurroundingDates(todayStart, datesLeftCount, datesRightCount);
}
*/

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
    dateNormalized.setHours(12, 0, 0, 0);
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

export type DateInterval = {
    intervalStart: Date,
    intervalEnd: Date
}

/**
 * Checks whether two intervals created out of 4 dates overlap
 * each other by days.
 * ! parameters must mark intervals,
 * i.e. start <= end
 */
export function dateIntervalsOverlapByDays(
    date1Start: Date,
    date1End: Date,
    date2Start: Date,
    date2End: Date)
{

    
    const [
        date1StartNormalized,
        date1EndNormalized,
        date2StartNormalized,
        date2EndNormalized
    ] = normalizeDates(
        date1Start,
        date1End,
        date2Start,
        date2End
    );

    
    return (
        (date1StartNormalized.getTime() <= date2EndNormalized.getTime())
        &&
        (date1EndNormalized.getTime() >= date2StartNormalized.getTime())
    );
}

export function isDateWeekday(date: Date)
{
    const day = date.getDay();
    return (day === 0) || (day === 6);
}

export function isDateToday(date: Date)
{
    const todayNormalized = normalizeDate(new Date());
    const dateNormalized = normalizeDate(date);

    return todayNormalized.getTime() === dateNormalized.getTime();
}