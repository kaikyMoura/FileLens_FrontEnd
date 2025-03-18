import Card from "@/components/Card"
import FileSelector from "@/components/FileSelector"
import { useLoadingContext } from "@/contexts/LoadingContextProvider"
import { useThemeContext } from "@/contexts/ThemeContextProvider"
import { useEffect } from "react"
import styles from "./styles.module.scss"

const Home = () => {
    const { setLoading } = useLoadingContext()
    const { theme, toggleTheme } = useThemeContext()

    useEffect(() => { }, [theme, toggleTheme])

    return (<>
        <div className={styles.container}>
            {/* <Card className={styles.card} pages={1}>
                <FileSelector />
            </Card> */}
        </div>
    </>)
}

export default Home