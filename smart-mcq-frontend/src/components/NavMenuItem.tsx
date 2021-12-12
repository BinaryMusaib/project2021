import { ListItemIcon, ListItemText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";

type NavMenuItemProps = {
    startIcon: React.ReactNode;
    url: string;
    text: string;
    description?: string;
};

export default function NavMenuItem({
    startIcon,
    url,
    text,
    description,
}: NavMenuItemProps) {
    const history = useHistory();

    return (
        <MenuItem className="navbtn" onClick={() => history.push(url)}>
            <ListItemIcon>{startIcon}</ListItemIcon>
            <ListItemText secondary={description}>{text}</ListItemText>
        </MenuItem>
    );
}
