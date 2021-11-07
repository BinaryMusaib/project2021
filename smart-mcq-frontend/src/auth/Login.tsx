import GuestLayout from "../components/GuestLayout";
import Button from "@mui/material/Button";
import React from "react";
import { useHistory } from "react-router-dom";
import Form from "../Form/index";
import AuthService from "../services/auth.service";
import { AuthDto } from "../dto";
import { FormError } from "../Form/types";
import { FetchContext } from "../context";

export default function Login() {
    const [loginData, setLoginData] = React.useState<AuthDto>(initLoginData());
    const [errors, setErrors] = React.useState<FormError>();

    const history = useHistory();

    const { whileLoading } = React.useContext(FetchContext);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        whileLoading(
            AuthService.authenticate(loginData)
                .then(() => history.push("/"))
                .catch((res) => setErrors(res.errors)),
        );
    };

    const handleChange = (name: string, value: any) =>
        setLoginData((data) => ({ ...data, [name]: value }));

    const toSignup = () => history.push("/signup");

    const toForgotPassword = () => history.push("/forgot-password");

    return (
        <GuestLayout title="Login">
            <form onSubmit={handleSubmit}>
                <Form
                    errors={errors}
                    fields={fields}
                    data={loginData}
                    onChange={handleChange}
                />
                <Button variant="contained" type="submit">
                    Login
                </Button>
            </form>
            <div className="guest-link">
                <Button variant="text" type="button" onClick={toSignup}>
                    Don't have an account ? Please signup.
                </Button>
            </div>
            <div className="guest-link">
                <Button
                    className="forgot-password"
                    type="button"
                    variant="text"
                    onClick={toForgotPassword}
                    color="info"
                >
                    Forgot Password
                </Button>
            </div>
        </GuestLayout>
    );
}

const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
];

function initLoginData(): AuthDto {
    return {
        email: "",
        password: "",
    };
}
