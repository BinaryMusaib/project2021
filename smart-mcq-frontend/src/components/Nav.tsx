import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import NavBtn from "./NavBtn";
import { Link, useHistory } from "react-router-dom";
import logo from "../logo.png";
import IfAuthenticated from "./IfAuthenticated";
import IfNotAuthenticated from "./IfNotAuthenticated";
import AuthService from "../services/auth.service";

export default function Nav() {
    const history = useHistory();
    return (
        <AppBar position="fixed" style={{ background: "#FFFFFF" }}>
            <Toolbar>
                <div className="trylogo">
                    <Link to="/">
                        <img src={logo} alt="mainLogo" />
                    </Link>
                </div>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {" "}
                </Typography>
                <div className="padd">
                    <IfAuthenticated>
                        <NavBtn
                            url="/questions/subjects"
                            startIcon={<AssessmentIcon />}
                            text="Subjects"
                        />
                        <NavBtn
                            url="/questions/topics"
                            text="Topics"
                            startIcon={<AnnouncementIcon />}
                        />
                        <NavBtn
                            url="/questions"
                            text="Questions"
                            startIcon={<AnnouncementIcon />}
                        />
                        <Button
                            size="large"
                            color="primary"
                            variant="text"
                            onClick={() => {
                                AuthService.logout();
                                history.push("/");
                            }}
                            startIcon={<LogoutIcon />}
                        >
                            Logout
                        </Button>
                    </IfAuthenticated>
                    <IfNotAuthenticated>
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
                    </IfNotAuthenticated>
                </div>
            </Toolbar>
        </AppBar>
    );
}
