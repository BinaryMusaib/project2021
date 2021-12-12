import MenuItem from "@mui/material/MenuItem";
import NavBtn from "./NavBtn";
import Typography from "@mui/material/Typography";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";

export default function GuestNav() {
    return (
        <>
            <MenuItem>
                <Typography>
                    <NavBtn
                        url="/signup"
                        text="Register"
                        startIcon={<HowToRegIcon />}
                    />
                    <NavBtn
                        url="/login"
                        text="Login"
                        startIcon={<LockOpenIcon />}
                    />
                </Typography>
            </MenuItem>
        </>
    );
}
