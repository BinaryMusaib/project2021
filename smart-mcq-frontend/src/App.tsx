import React from "react";
import Router from "./Router";
import { FetchContext, AuthContext } from "./context";
import AuthService from "./services/auth.service";

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
    );
}

export default App;
