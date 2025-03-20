import Button from "@/components/Button"
import CookiesPopup from "@/components/CookiesPopup"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./styles.module.scss"

const Home = () => {
    const router = useRouter()

    const [openPopup, setOpenPopup] = useState(false)

    useEffect(() => {
        const handleCookiesPopup = () => {
            if (!Cookies.get('UserConsent')) {
                setOpenPopup(true)
            }
            else {
                setOpenPopup(false)
            }
        }
        handleCookiesPopup()
    }, [])

    const handleSetCookies = () => {
        Cookies.set('UserConsent', 'true', { path: '/', secure: true, sameSite: 'Strict' })
        setOpenPopup(false)
    }

    const handleGetOut = async () => {
        Cookies.remove('Token')
        Cookies.remove('UserEmail')
        router.push('/login')

    }

    return (<>
        <div className={styles.container}>
            <Button style={"primary"} text={"Get out"} type="submit" action={handleGetOut} />
        </div >
        {openPopup && <CookiesPopup close={handleSetCookies} />}
    </>)
}

export default Home