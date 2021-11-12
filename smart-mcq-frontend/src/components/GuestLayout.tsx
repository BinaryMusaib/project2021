import Paper from "@mui/material/Paper";
import React from "react";
import { FetchContext } from "../context";
import Backdrop from "./Backdrop";
import "./GuestLayout.css";
import Logo from "../logo.png";
import { Link } from "react-router-dom";

interface GuestLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function GuestLayout({ title, children }: GuestLayoutProps) {
    const { isLoading } = React.useContext(FetchContext);

    return (
        <div className="guest-layout">
            <Paper className="paper" elevation={9}>
                <header>
                    <Link to="/">
                        <img src={Logo} alt="Smart MCQs" className="logo" />
                    </Link>
                    <h1>{title}</h1>
                    <hr />
                </header>
                <main>{children}</main>
            </Paper>
            <Backdrop visible={isLoading} />
        </div>
    );
}
