import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { useHistory } from "react-router-dom";

type QuestionMenuProps = {
    topicId?: number;
};

export default function QuestionMenu({ topicId }: QuestionMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(e.currentTarget);

    const history = useHistory();
    const handleClose = () => setAnchorEl(null);
    const toTopicDetails = () => history.push(`/topic/${topicId}`);
    const toQuestions = () => history.push(`/topic/${topicId}/questions`);

    return (
        <>
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>
                    <MoreIcon color="primary" />
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={toTopicDetails}>Topic Details</MenuItem>
                <MenuItem onClick={toQuestions}>Questions</MenuItem>
            </Menu>
        </>
    );
}
