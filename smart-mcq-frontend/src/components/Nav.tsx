import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import NavBtn from "./NavBtn";

export default function Nav() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                ></IconButton>
                <div className="trylogo"></div>
                <div className="padd">
                    <NavBtn
                        url="/Assessment"
                        startIcon={<AssessmentIcon />}
                        text="Assessment"
                    />
                    <NavBtn
                        url="#"
                        text="About Us"
                        startIcon={<AnnouncementIcon />}
                    />

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
                </div>
            </Toolbar>
        </AppBar>
    );
}
