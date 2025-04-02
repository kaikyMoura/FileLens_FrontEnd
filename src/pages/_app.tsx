import { AuthProvider } from "@/contexts/AuthContextProvider";
import { LoadingProvider } from "@/contexts/LoadingContextProvider";
import { PageProvider } from "@/contexts/PageContextProvider";
import { ThemeProvider } from "@/contexts/ThemeContextProvider";
import { UserProvider } from "@/contexts/UserInfoContextProvider";
import { AppProps } from "next/app";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Tooltip } from "react-tooltip";
import '../styles/globals.css';

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