import React from "react";
import { parseISO, format } from "date-fns";

export type DateType = Date | string | null;

interface DateFormatterProps {
    includeTime?: boolean;
    includeDate?: boolean;
    date?: DateType;
}

export const toDate = (date: Date | string): Date =>
    typeof date === "string" ? parseISO(date) : date;

export const timeFormat = (date?: DateType) => {
    if (!date) return null;
    return format(toDate(date), "hh:mm b");
};

export const dateFormat = (date?: DateType) => {
    if (!date) return null;
    return toDate(date).toLocaleDateString();
};

export const dateTimeFormat = (date?: DateType) => {
    if (!date) return null;
    return dateFormat(date) + " " + timeFormat(date);
};

export function DateFormatter({
    includeTime = false,
    includeDate = true,
    date,
}: DateFormatterProps) {
    if (!date) return <React.Fragment></React.Fragment>;
    const dateStr = includeDate ? dateFormat(date) : "";
    const timeStr = includeTime ? timeFormat(date) : "";
    return <span className="date">{[dateStr, timeStr].join(" ")}</span>;
}
