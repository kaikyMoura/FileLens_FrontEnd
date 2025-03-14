import Loader from "@/utils/Loader";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface LoadingContextProps {
    isLoading: boolean | false,
    setLoading: Dispatch<SetStateAction<boolean>>
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined)

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
            {isLoading && <Loader />}
        </LoadingContext.Provider>
    );
};

export const useLoadingContext = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoadingContext must be used within an LoadingProvider');
    }
    return context;
};