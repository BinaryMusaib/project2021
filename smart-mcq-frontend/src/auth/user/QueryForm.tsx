import { Box, Button, TextField } from "@mui/material";
import React from "react";

type QueryFormProps = {
    onFilter: (query: string) => Promise<void>;
};

export default function QueryForm({ onFilter }: QueryFormProps) {
    const [query, setQuery] = React.useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter(query);
    };

    return (
        <Box className="query-form">
            <form method="get" onSubmit={handleSubmit}>
                <TextField
                    name="query"
                    onChange={(e) => setQuery(e.target.value)}
                    label="Search User"
                    helperText={
                        "You can search by name or email." +
                        "Atleast enter three letters."
                    }
                    variant="standard"
                    value={query}
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!query || query.length <= 2}
                >
                    Search
                </Button>
            </form>
        </Box>
    );
}
