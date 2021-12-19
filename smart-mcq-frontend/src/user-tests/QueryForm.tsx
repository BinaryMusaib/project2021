import Form from "../Form";
import { Button } from "@mui/material";
import React from "react";
import { UserTestFilterDto } from "../dto/question";
import { addMonths } from "date-fns";

export type QueryFormProps = {
    onSubmit: (filter: UserTestFilterDto) => Promise<void>;
};

export default function QueryForm({ onSubmit }: QueryFormProps) {
    const [filter, setFilter] = React.useState<UserTestFilterDto>(initFilter());
    const handleChange = (key: string, value: any) =>
        setFilter((filter) => ({ ...filter, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(filter);
    };

    const fields = React.useMemo(() => getFields(), []);

    return (
        <form onSubmit={handleSubmit}>
            <Form fields={fields} data={filter} onChange={handleChange} />
            <Button type="submit" variant="contained">
                Filter
            </Button>
        </form>
    );
}

function initFilter() {
    return {
        startDate: new Date(),
        endDate: addMonths(new Date(), 3),
    };
}

function getFields() {
    return [
        { name: "startDate", label: "From", type: "date" },
        { name: "endDate", label: "To", type: "date" },
    ];
}
