import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import PageIcon from "@mui/icons-material/Feed";
import ListIcon from "@mui/icons-material/DynamicFeed";

type ViewSelectProps = {
    showAll: boolean;
    onToggle: () => void;
};

export default function ViewSelect({ showAll, onToggle }: ViewSelectProps) {
    return (
        <Box className="view-select">
            <ToggleButtonGroup
                value={showAll ? "All" : "Page"}
                exclusive
                onChange={() => onToggle()}
                aria-label="text alignment"
            >
                <ToggleButton
                    value="Page"
                    aria-label="Pagewise"
                    disabled={!showAll}
                >
                    <PageIcon />
                </ToggleButton>
                <ToggleButton
                    value="All"
                    aria-label="Show All"
                    disabled={showAll}
                >
                    <ListIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}
