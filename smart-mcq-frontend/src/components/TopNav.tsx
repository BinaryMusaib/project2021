import { Breadcrumbs, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

type TopNavProps = {
    breadcrumbs: [
        {
            link?: string;
            text: string;
        },
    ];
};

export default function TopNav({ breadcrumbs }: TopNavProps) {
    const history = useHistory();
    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs.map(({ link, text }) => (
                <Button
                    disabled={!link}
                    variant="text"
                    onClick={link ? () => history.push(link) : undefined}
                >
                    {text}
                </Button>
            ))}
        </Breadcrumbs>
    );
}
