import { AuthProvider } from "@/contexts/AuthContextProvider";
import { LoadingProvider } from "@/contexts/LoadingContextProvider";
import { ThemeProvider } from "@/contexts/ThemeContextProvider";
import { AppProps } from "next/app";
import { Tooltip } from "react-tooltip";
import '../styles/globals.css';
import { PageProvider } from "@/contexts/PageContextProvider";
import { UserProvider } from "@/contexts/UserInfoContextProvider";

const App = ({ Component, pageProps }: AppProps) => {

    return (
        <>
            <LoadingProvider>
                <PageProvider>
                    <UserProvider>
                        <ThemeProvider>
                            <AuthProvider>
                                <Component {...pageProps} />
                            </AuthProvider>
                            <Tooltip id="my-tooltip" place="right-start" />
                        </ThemeProvider>
                    </UserProvider>
                </PageProvider>
            </LoadingProvider>
        </>
    )
}

export default App;