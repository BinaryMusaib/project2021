import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import IfAuthenticated from "./IfAuthenticated";
import IfNotAuthenticated from "./IfNotAuthenticated";
import UserNav from "./UserNav";
import GuestNav from "./GuestNav";
import IfAdmin from "./IfAdmin";
import AdminNav from "./AdminNav";
import HomeIcon from "@mui/icons-material/Home";
import NavBtn from "./NavBtn";

export default function Nav() {
    return (
        <AppBar
            position="fixed"
            style={{ background: "#FFFFFF" }}
            className="navbar"
        >
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
                            text="Home"
                            startIcon={<HomeIcon />}
                            url="/home"
                        />
                        <IfAdmin>
                            <AdminNav />
                        </IfAdmin>
                        <UserNav />
                    </IfAuthenticated>
                    <IfNotAuthenticated>
                        <GuestNav />
                    </IfNotAuthenticated>
                </div>
            </Toolbar>
        </AppBar>
    );
}
