import LogoutIcon from "@mui/icons-material/ExitToApp";
import NavMenuItem from "./NavMenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PagesIcon from "@mui/icons-material/Pages";
import GroupIcon from "@mui/icons-material/Group";
import QuizIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import React from "react";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import MyTestIcon from "@mui/icons-material/Assessment";
import { ListItem } from "@mui/material";

export default function UserNav() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const history = useHistory();

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        AuthService.logout();
        history.push("/");
        window.location.reload();
    };

    return (
        <>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px", width: 420, maxWidth: "100%" }}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem disabled={true}>
                    <ListItem>
                        <ListItemText>Your Tests</ListItemText>
                    </ListItem>
                </MenuItem>

                <NavMenuItem
                    url="/home"
                    startIcon={<MyTestIcon />}
                    text="Take a test"
                    description="Take a test you have been assigned"
                />

                <NavMenuItem
                    url="/subjects-undertaken"
                    startIcon={<MyTestIcon />}
                    text="Subject Statistics"
                    description="Your performance statistics"
                />
                <Divider />
                <MenuItem disabled={true}>
                    <ListItem>
                        <ListItemText>Mentoring</ListItemText>
                    </ListItem>
                </MenuItem>
                <NavMenuItem
                    url="/tests"
                    startIcon={<QuizIcon />}
                    text="Tests"
                    description="Create & manage your own tests"
                />

                <NavMenuItem
                    url="/question-papers"
                    text="Question Papers"
                    description="Manage your question papers"
                    startIcon={<PagesIcon />}
                />
                <NavMenuItem
                    url="/examinee-lists"
                    text="Examinee Lists"
                    description="Manage your list of students/examinees"
                    startIcon={<GroupIcon />}
                />

                <Divider />
                <MenuItem className="navbtn" onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
