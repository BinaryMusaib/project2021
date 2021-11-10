import React from "react";
import { useHistory } from "react-router-dom";
import GuestLayout from "../components/GuestLayout";
import { ResetPasswordRequestDto } from "../dto";
import AuthService from "../services/auth.service";
import Form from "../Form";
import Button from "@mui/material/Button";
import { FormError } from "../Form/types";
import { FetchContext } from "../context";

export default function ForgotPassword() {
    const [data, setData] = React.useState<ResetPasswordRequestDto>({
        email: "",
    });
    const [errors, setErrors] = React.useState<FormError>();
    const history = useHistory();

    const handleChange = (key: string, value: any) =>
        setData((data) => ({ ...data, [key]: value }));

    const { whileLoading } = React.useContext(FetchContext);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        whileLoading(
            AuthService.resetPasswordRequest(data)
                .then(() => history.push("/forgot-password-complete"))
                .catch((res) => setErrors(res.errors)),
        );
    };

    return (
        <GuestLayout title="Forgot Password">
            <form onSubmit={handleSubmit}>
                <Form
                    data={data}
                    fields={fields}
                    onChange={handleChange}
                    errors={errors}
                />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </GuestLayout>
    );
}

const fields = [{ name: "email", label: "Email", type: "email" }];
