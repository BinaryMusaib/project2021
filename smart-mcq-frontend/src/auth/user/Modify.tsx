import UserService from "../../services/user.service";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "../../Form";
import { UserDto } from "../../dto";
import Button from "@mui/material/Button";
import Layout from "../../components/Layout";
import { FetchContext } from "../../context";
import { FormError } from "../../Form/types";
import Paper from "@mui/material/Paper";

export default function Modify() {
    const [user, setUser] = React.useState<UserDto>(initUser());

    const [errors, setErrors] = React.useState<FormError>();
    const { id } = useParams<{ id: string }>();
    const { whileLoading } = React.useContext(FetchContext);
    const history = useHistory();

    React.useEffect(() => {
        if (!Number.isNaN(Number.parseInt(id))) {
            whileLoading(
                UserService.getById(Number.parseInt(id)).then((res) =>
                    setUser(res.body!),
                ),
            );
        }
    }, [id, whileLoading]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { isActive, role } = user;
        whileLoading(
            UserService.update(Number.parseInt(id), { isActive, role })
                .then(() => history.push("/admin/users"))
                .catch((res) => setErrors(res.errors)),
        );
    };

    const handleChange = (key: string, value: any) =>
        setUser((user) => ({ ...user, [key]: value }));

    return (
        <Layout title="Add/Modify User">
            <Paper className="paper-form paper">
                <form onSubmit={handleSubmit}>
                    <Form
                        data={user}
                        fields={formFields}
                        onChange={handleChange}
                        errors={errors}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </form>
            </Paper>
        </Layout>
    );
}

const formFields = [
    { name: "firstName", label: "First Name", type: "text", disabled: true },
    { name: "lastName", label: "Last Name", type: "text", disabled: true },
    { name: "email", label: "Email", type: "email", disabled: true },
    { name: "isActive", label: "Is Active", type: "checkbox" },
    {
        name: "role",
        label: "Roles",
        type: "select",
        options: [
            { label: "Admin", value: "Admin" },
            { label: "User", value: "User" },
        ],
    },
];

const initUser = (): UserDto => ({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    isActive: false,
    role: "User",
});
