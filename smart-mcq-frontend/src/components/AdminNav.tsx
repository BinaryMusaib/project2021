import Button from "@mui/material/Button";
import SubjectIcon from "@mui/icons-material/Subject";
import TopicIcon from "@mui/icons-material/Topic";
import NavMenuItem from "./NavMenuItem";
import UserIcon from "@mui/icons-material/AccountBox";
import AdminIcon from "@mui/icons-material/AdminPanelSettings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

export default function AdminNav() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Button
                className="navbtn"
                variant="text"
                onClick={handleOpen}
                startIcon={<AdminIcon />}
            >
                Administrate
            </Button>
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
                <NavMenuItem
                    url="/admin/users"
                    startIcon={<UserIcon />}
                    text="Users"
                    description="Manage Users"
                />
                <NavMenuItem
                    url="/subjects"
                    startIcon={<SubjectIcon />}
                    text="Subjects"
                    description="Manage Subjects"
                />
                <NavMenuItem
                    url="/topics"
                    text="Topics"
                    description="Manage Topics & related questions"
                    startIcon={<TopicIcon />}
                />
            </Menu>
        </>
    );
}
