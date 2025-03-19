"use client";
import DashBoard from '@/components/Dashboard';
import { useRouter } from 'next/router';
import React, { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { useLoadingContext } from '../LoadingContextProvider';
import Cookies from 'js-cookie';

type AuthContextProps = {
    isAuthenticated: boolean | null;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AppContext = createContext<AuthContextProps | undefined>(undefined)

const publicPages = ['/login', '/registration', '/getStarted', '/verifyAccount', '/accountVerify', '/resetPassword', '/changePassword']

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const { setLoading } = useLoadingContext();
    const router = useRouter();

    const handleRouteChange = useCallback(() => setLoading(true), [setLoading]);
    const handleRouteComplete = useCallback(() => setLoading(false), [setLoading]);

    useEffect(() => {
        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeComplete', handleRouteComplete);
        router.events.on('routeChangeError', handleRouteComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            router.events.off('routeChangeComplete', handleRouteComplete);
            router.events.off('routeChangeError', handleRouteComplete);
        };
    }, [handleRouteChange, handleRouteComplete, router.events]);

    const handleAuthentication = useCallback(async () => {
        const token = Cookies.get('Token')
        setLoading(true);

        if (!token) {
            if (!publicPages.includes(router.pathname)) {
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(true)
        }

        setLoading(false);
    }, [router.pathname, setLoading]);

    useEffect(() => {
        handleAuthentication();
    }, [router.pathname, handleAuthentication]);

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {isAuthenticated && !publicPages.includes(router.pathname) ? (
                <DashBoard>
                    {children}
                </DashBoard>
            ) : (
                <main>{children}</main>
            )}
        </AppContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = React.useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};