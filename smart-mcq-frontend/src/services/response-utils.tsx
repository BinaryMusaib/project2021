import { parseISO } from "date-fns";

export function parseDates<T>(
    data: any,
    isDateKey: (key: string) => boolean = defaultDateKey,
): T {
    if (!(data instanceof Object)) return data;
    const out = Object.keys(data).reduce((prev, key) => {
        let v = data[key];
        if (key !== "errors" && v != null) {
            if (isDateKey(key)) {
                v =
                    typeof v === "string" &&
                        (v.indexOf(":") > -1 ||
                            v.match(/\d\d[-/]\d\d[-/]\d\d(\d*)/))
                        ? parseISO(v)
                        : v;
            } else if (Array.isArray(v)) {
                v = v.map((e) => parseDates(e));
            } else if (!!v && v.constructor === Object) {
                v = parseDates(v, isDateKey);
            }
            prev[key] = v;
        }
        return prev;
    }, {} as any);
    return out as any;
}

export function removeSpaces<T>(data: T | T[]): T | T[] {
    if (!(data instanceof Object)) return data;

    if (Array.isArray(data)) {
        return data.map((entry) => removeSpaces(entry)) as T[];
    }

    (Object.keys(data) as (keyof T)[]).forEach((key) => {
        if ((data[key] as any) === "") delete data[key];
    });

    return data;
}

export const removeZerosInIds = (body: any | any[]) => {
    if (!body) return;

    if (Array.isArray(body)) body.forEach((e) => removeZerosInIds(e));
    else
        Object.keys(body).forEach((key: string) => {
            if (key.endsWith("Id") && body[key] === 0) delete body[key];
        });
};

const defaultDateKey = (key: string): boolean =>
    key.indexOf("Date") !== -1 ||
    key.indexOf("date") === 0 ||
    key.indexOf("Time") !== -1;

export function lowercaseFirstLetter(key: string) {
    if (key.toUpperCase() === key) return key.toLocaleLowerCase();
    return key[0].toLowerCase() + key.substr(1);
}
