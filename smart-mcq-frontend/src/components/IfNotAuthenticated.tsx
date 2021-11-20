import React from "react";
import { AuthContext } from "../context";

type IfNotAuthenticatedProps = {
    children: React.ReactNode;
};

export default function IfNotAuthenticated({
    children,
}: IfNotAuthenticatedProps) {
    const { isLoggedIn } = React.useContext(AuthContext);

    return <>{!isLoggedIn ? children : null}</>;
}
