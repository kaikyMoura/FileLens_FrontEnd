import { AuthProvider } from "@/contexts/AuthContextProvider";
import { LoadingProvider } from "@/contexts/LoadingContextProvider";
import { ThemeProvider } from "@/contexts/ThemeContextProvider";
import { AppProps } from "next/app";
import { Tooltip } from "react-tooltip";
import '../styles/globals.css';
import { PageProvider } from "@/contexts/PageContextProvider";

const App = ({ Component, pageProps }: AppProps) => {

    return (
        <>
            <LoadingProvider>
                <PageProvider>
                    <ThemeProvider>
                        <AuthProvider>
                            <Component {...pageProps} />
                        </AuthProvider>
                        <Tooltip id="my-tooltip" place="right-start" />
                    </ThemeProvider>
                </PageProvider>
            </LoadingProvider>
        </>
    )
}

export default App;