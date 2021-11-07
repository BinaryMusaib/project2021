import React from "react";

type FetchContextType = {
    isLoading: boolean;
    error?: boolean;
    errorMessage?: string;
    whileLoading: (promise: Promise<any>) => Promise<any>;
};

export const FetchContext = React.createContext<FetchContextType>({
    isLoading: false,
    whileLoading: async (_: Promise<any>) => { },
});
