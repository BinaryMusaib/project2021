import GuestLayout from "../components/GuestLayout";
import Form from "../Form";
import Button from "@mui/material/Button";
import React from "react";
import AuthService from "../services/auth.service";
import { SignupDto } from "../dto";
import { useHistory } from "react-router-dom";
import { FormError } from "../Form/types";
import { FetchContext } from "../context";

function initSignupData(): SignupDto {
    return {
        firstName: "",
        lastName: "",
        email: "",
    };
}

export default function Signup() {
    const [signupData, setSignupData] = React.useState<SignupDto>(
        initSignupData(),
    );
    const [errors, setErrors] = React.useState<FormError>();
    const { whileLoading } = React.useContext(FetchContext);
    const history = useHistory();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        whileLoading(
            AuthService.signup(signupData)
                .then(() => {
                    //console.log("This is it!");
                    history.push("/set-password-confirmation");
                })
                .catch((res) => {
                    setErrors(res.errors);
                }),
        );
    };

    const handleChange = (name: string, value: any) =>
        setSignupData((data) => ({ ...data, [name]: value }));

    const toLogin = () => history.push("/login");

    return (
        <GuestLayout title="Sign Up">
            <form onSubmit={handleSubmit}>
                <Form
                    errors={errors}
                    fields={fields}
                    data={signupData}
                    onChange={handleChange}
                />
                <div className="button-panel">
                    <Button variant="contained" type="submit"> 
                        Register
                    </Button>
                </div>
            </form>
            <div className="guest-link">
                <Button variant="text" type="button" onClick={toLogin}>
                    Already have an account ? Please login here
                </Button>
            </div>
        </GuestLayout>
    );
}

const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
];
