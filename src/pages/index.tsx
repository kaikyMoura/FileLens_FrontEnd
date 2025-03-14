import { useLoadingContext } from "@/contexts/LoadingContextProvider"
import Cookies from "js-cookie"
import styles from "./styles.module.scss"
import { useThemeContext } from "@/contexts/ThemeContextProvider"
import { useEffect } from "react"
import Card from "@/components/Card"

const Home = () => {
    const { setLoading } = useLoadingContext()
    const { theme, toggleTheme } = useThemeContext()

    useEffect(() => { }, [theme, toggleTheme])

    return (<>
        {/* <div className={`flex gap-6 ${styles.container}`}>
            <Card className={styles.card} pages={1}>
                <div></div>
                <div></div>
            </Card>
            <button onClick={() => Cookies.remove('Token')}>Sair</button>
            <button onClick={() => setLoading(true)}>carregar</button>
            <button onClick={toggleTheme}>{theme === 'dark' ? "🌙 Modo Escuro" : "☀️ Modo Claro"} </button>
        </div> */}
    </>)
}

export default Home