import GuestLayout from "../../components/GuestLayout";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function SetPasswordConfirmation() {
    const history = useHistory();

    return (
        <GuestLayout title="Password Saved">
            <div className="confirmation-text">
                <h3>
                    Your password has been set. Please click the button below to
                    login with your new password.
                </h3>

                <div className="loginbutton">
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={() => history.push("/login")}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </GuestLayout>
    );
}
