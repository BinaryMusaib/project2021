import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SubjectIcon from "@mui/icons-material/Subject";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import TopicIcon from '@mui/icons-material/Topic';
import LogoutIcon from "@mui/icons-material/ExitToApp";
import NavBtn from "./NavBtn";
import { Link, useHistory } from "react-router-dom";
import logo from "../logo.png";
import IfAuthenticated from "./IfAuthenticated";
import IfNotAuthenticated from "./IfNotAuthenticated";
import AuthService from "../services/auth.service";
import PagesIcon from '@mui/icons-material/Pages';

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
                            url="/subjects"
                            startIcon={<SubjectIcon/>}
                            text="Subjects"
                        />
                        <NavBtn
                            url="/topics"
                            text="Topics"
                            startIcon={<TopicIcon />}
                        />
                        <NavBtn
                            url="/question-papers"
                            text="Paper"
                            startIcon={<PagesIcon />}
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
