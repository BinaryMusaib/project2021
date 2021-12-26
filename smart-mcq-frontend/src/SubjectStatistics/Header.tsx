import { SubjectStatisticsFilterDto } from "../dto/question";
import React from "react";
import { Button } from "@mui/material";
import Form from "../Form";
import { addMonths } from "date-fns";

type HeaderProps = {
    subjectId?: number;
    onFilter: (filter: SubjectStatisticsFilterDto) => Promise<void>;
};

export default function Header({ subjectId, onFilter }: HeaderProps) {
    const [filter, setFilter] = React.useState<SubjectStatisticsFilterDto>(
        initFilter(subjectId),
    );

    const handleChange = (key: string, value: any) =>
        setFilter((filter) => ({ ...filter, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter(filter);
    };

    const fields = React.useMemo(() => getFields(), []);

    React.useEffect(() => {
        onFilter(filter);
    }, [filter, onFilter]);

    return (
        <form onSubmit={handleSubmit}>
            <Form fields={fields} data={filter} onChange={handleChange} />
            <Button type="submit" variant="contained">
                Filter
            </Button>
        </form>
    );
}

function initFilter(subjectId?: number): SubjectStatisticsFilterDto {
    return {
        subjectId: subjectId,
        startTime: addMonths(new Date(), -3),
        endTime: new Date(),
        period: "Daily",
    };
}

function getFields() {
    return [
        {
            name: "startTime",
            label: "Start Date",
            type: "date",
        },
        {
            name: "endTime",
            label: "End Date",
            type: "date",
        },
    ];
}
