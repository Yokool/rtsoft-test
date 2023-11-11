
export function getKeyForValue<ValueType>(object: Object, value: ValueType) {
    return Object.keys(object).find((key) => {
        const objectValue = object[key];
        return objectValue === value;
    });
}

// undefined checked version for when you know you
// should get a value and want to be sure you'll get one
export function getKeyForValueDefined<ValueType>(object: Object, value: ValueType) {
    const nonExhaustiveReturn = getKeyForValue(object, value);

    if(nonExhaustiveReturn === undefined)
    {
        throw new Error("getKeyForValueDefined tried returned an undefined value.");
    }

    return nonExhaustiveReturn;
}