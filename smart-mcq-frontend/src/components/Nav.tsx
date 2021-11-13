import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import NavBtn from "./NavBtn";
import { Link } from "react-router-dom";
import logo from "../logo.png";

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
                <div className="trylogo">
                <Link to="/">
                    <img src={logo} alt="mainLogo"  />
                </Link>
                </div>
                <div className="padd">
                    <NavBtn
                        url="/questions/subjects"
                        startIcon={<AssessmentIcon />}
                        text="Subjects"
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
