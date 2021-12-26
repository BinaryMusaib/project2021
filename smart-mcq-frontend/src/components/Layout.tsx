import Backdrop from "./Backdrop";
import { FetchContext } from "../context";
import React from "react";
import Nav from "./Nav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Layout.css";

type LayoutProps = {
    title?: string;
    description?: string;
    children: React.ReactNode;
};

export default function Layout({ children, title, description }: LayoutProps) {
    const { isLoading } = React.useContext(FetchContext);
    return (
        <Box sx={{ flexGrow: 1 }} className="layout">
            <Nav />
            <div className="layout-body">
                <header>
                    {title ? (
                        <div className="page-header">
                            <Typography className="page-title" variant="h5">
                                {title}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                className="page-description"
                            >
                                {description}
                            </Typography>
                        </div>
                    ) : null}
                </header>
                <main>{children}</main>
            </div>
            <Backdrop visible={isLoading} />
        </Box>
    );
}
