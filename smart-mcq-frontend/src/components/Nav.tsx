import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link} from "react-router-dom";
import logo from "../logo.png";
import IfAuthenticated from "./IfAuthenticated";
import IfNotAuthenticated from "./IfNotAuthenticated";
import UserNav from "./UserNav";
import GuestNav from "./GuestNav";

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
