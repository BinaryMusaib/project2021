import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SubjectIcon from "@mui/icons-material/Subject";
import TopicIcon from "@mui/icons-material/Topic";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import NavBtn from "./NavBtn";
import { useHistory } from "react-router-dom";
import PagesIcon from "@mui/icons-material/Pages";
import GroupIcon from "@mui/icons-material/Group";
import QuizIcon from "@mui/icons-material/Quiz";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import AuthService from "../services/auth.service";
import ApiIcon from '@mui/icons-material/Api';

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
            <NavBtn url="/exams" startIcon={<ApiIcon />} text="Assigned Test" />
            <NavBtn url="/tests" startIcon={<QuizIcon />} text="Create Tests" />
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
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
                <MenuItem onClick={handleClose}>
                    <Typography>
                        <NavBtn
                            url="/subjects"
                            startIcon={<SubjectIcon />}
                            text="Subjects"
                        />
                        <br />
                        <NavBtn
                            url="/topics"
                            text="Topics"
                            startIcon={<TopicIcon />}
                        />
                        <br />
                        <NavBtn
                            url="/question-papers"
                            text="Papers"
                            startIcon={<PagesIcon />}
                        />
                        <br />
                        <NavBtn
                            url="/examinee-lists"
                            text="Examinees"
                            startIcon={<GroupIcon />}
                        />
                        <br />
                        <Button
                            size="large"
                            color="primary"
                            variant="text"
                            className="navbtn"
                            onClick={handleLogout}
                            startIcon={<LogoutIcon />}
                        >
                            Logout
                        </Button>
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
}
