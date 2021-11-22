import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

type NavBtnProps = {
    startIcon: React.ReactNode;
    url: string;
    text: string;
};

export default function NavBtn({ startIcon, url, text }: NavBtnProps) {
    const history = useHistory();

    return (
        <Button
            size="large"
            color="primary"
            variant="text"
            onClick={() => history.push(url)}
            startIcon={startIcon}
        >
            {text}
        </Button>
    );
}
