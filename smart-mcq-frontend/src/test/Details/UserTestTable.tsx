import Table, { TableColumn } from "../../Table";
import React from "react";
import { TestDto, TestUserTestDto } from "../../dto/question";
import { UserDto } from "../../dto";
import { testStatus } from "../../user-tests/utils";
import Actions from "./Actions";

type UserTestTableProps = {
    test: TestDto;
    userTests: TestUserTestDto[];
};

export default function UserTestTable({ test, userTests }: UserTestTableProps) {
    const columns = React.useMemo(() => getColumns(test), [test]);
    return <Table data={userTests} columns={columns} />;
}

function getColumns(test: TestDto): TableColumn[] {
    return [
        {
            name: "user",
            type: "custom",
            format: toUserName,
            label: "Examinee",
        },
        {
            name: "startTime",
            type: "datetime",
            label: "Start Time",
        },
        {
            name: "endTime",
            type: "datetime",
            label: "End Time",
        },
        {
            name: "status",
            type: "custom",
            label: "Status",
            format: (_: any, userTest: TestUserTestDto) =>
                toUserTestStatus(userTest, test),
        },
        {
            name: "id",
            type: "custom",
            format: (_: number, userTest: TestUserTestDto) => (
                <Actions userTest={userTest} />
            ),
            label: "Actions",
        },
    ];
}

function toUserName(user: UserDto) {
    return (
        <span>
            {user.firstName} {user.lastName} ({user.email})
        </span>
    );
}

function toUserTestStatus(userTest: TestUserTestDto, test: TestDto) {
    return (
        <span className="user-status">
            {testStatus({ ...userTest, test }).toString()}
        </span>
    );
}
