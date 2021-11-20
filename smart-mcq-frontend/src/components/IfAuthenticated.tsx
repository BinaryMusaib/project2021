import React from "react";
import { AuthContext } from "../context";

type IfAuthenticatedProps = {
    children: React.ReactNode;
};

export default function IfAuthenticated({ children }: IfAuthenticatedProps) {
    const { isLoggedIn } = React.useContext(AuthContext);

    return <>{isLoggedIn ? children : null}</>;
}
