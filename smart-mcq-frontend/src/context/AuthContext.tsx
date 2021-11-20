import React from "react";
import { AuthProfile } from "../dto";

type AuthContextType = {
    profile: AuthProfile | null;
    isLoggedIn: boolean;
};

export const AuthContext = React.createContext<AuthContextType>({
    isLoggedIn: false,
    profile: null,
});
