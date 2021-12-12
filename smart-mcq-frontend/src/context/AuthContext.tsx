import React from "react";
import { AuthProfile } from "../dto";

type AuthContextType = {
    getProfile: () => AuthProfile | null;
    isLoggedIn: boolean;
};

export const AuthContext = React.createContext<AuthContextType>({
    isLoggedIn: false,
    getProfile: () => null,
});
