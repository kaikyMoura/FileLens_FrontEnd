import { AuthProvider } from "@/contexts/AuthContextProvider";
import { LoadingProvider } from "@/contexts/LoadingContextProvider";
import { ThemeProvider } from "@/contexts/ThemeContextProvider";
import { AppProps } from "next/app";
import { Tooltip } from "react-tooltip";
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {

    return (
        <>
            <LoadingProvider>
                <ThemeProvider>
                    <AuthProvider>
                        <Component {...pageProps} />
                    </AuthProvider>
                    <Tooltip id="my-tooltip" place="right-start" />
                </ThemeProvider>
            </LoadingProvider>
        </>
    )
}

export default App;