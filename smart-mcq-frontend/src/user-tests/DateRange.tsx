import { UserTestDto, TestDto } from "../dto/question";
import { DateFormatter } from "../components/date-formatters";

type DateRangeProps = {
    test: TestDto | UserTestDto;
};

export default function DateRange({
    test: { startTime, endTime },
}: DateRangeProps) {
    return (
        <span className="date-range">
            <DateFormatter date={startTime} includeTime={true} /> {" - "}
            <DateFormatter date={endTime} includeTime={true} />
        </span>
    );
}
