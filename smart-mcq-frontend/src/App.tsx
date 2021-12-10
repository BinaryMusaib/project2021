import React from "react";
import Router from "./Router";
import { FetchContext, AuthContext } from "./context";
import AuthService from "./services/auth.service";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function App() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const whileLoading = React.useCallback(
        async (promise: Promise<void>) => {
            setIsLoading(true);
            return promise.finally(() => setIsLoading(false));
        },
        [setIsLoading],
    );

    const profile = AuthService.getProfile();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <AuthContext.Provider
                value={{
                    isLoggedIn: profile !== null,
                    profile,
                }}
            >
                <FetchContext.Provider value={{ whileLoading, isLoading }}>
                    <Router />
                </FetchContext.Provider>
            </AuthContext.Provider>
        </LocalizationProvider>
    );
}

export default App;
