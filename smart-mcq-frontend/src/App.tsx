import React from "react";
import Router from "./Router";
import { FetchContext } from "./context";

function App() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const whileLoading = React.useCallback(
        async (promise: Promise<void>) => {
            setIsLoading(true);
            return promise.finally(() => setIsLoading(false));
        },
        [setIsLoading],
    );

    return (
        <FetchContext.Provider value={{ whileLoading, isLoading }}>
            <Router />
        </FetchContext.Provider>
    );
}

export default App;
