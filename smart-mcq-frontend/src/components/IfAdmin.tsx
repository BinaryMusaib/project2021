import React from "react";
import { AuthContext } from "../context";

type IfAdminProps = {
    children: React.ReactNode;
};

export default function IfAdmin({ children }: IfAdminProps) {
    const { getProfile } = React.useContext(AuthContext);

    return <>{getProfile()?.role === "Admin" ? children : null}</>;
}
