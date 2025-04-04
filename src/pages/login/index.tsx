import { login } from "@/services/userService"
import Button from "@/components/Button"
import Card from "@/components/Card"
import Input from "@/components/Input"
import { useLoadingContext } from "@/contexts/LoadingContextProvider"
import { User } from "@/types/user"
import Link from "next/link"
import { useRouter } from "next/router"
import { SetStateAction, useState } from "react"
import { FaFolderOpen } from "react-icons/fa6"
import styles from "./styles.module.scss"
import Cookies from "js-cookie"
import { useUserContext } from "@/contexts/UserInfoContextProvider"

const Login = () => {
    const router = useRouter()
    const { setLoading } = useLoadingContext()

    const { setUserEmail } = useUserContext()

    const [email, setEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const handleLogin = async () => {
        const user: User = {
            email: email,
            user_password: userPassword,
        }

        setLoading(true)

        if (user) {
            const response = await login(user)
            if (response.success === true) {
                const email = Cookies.get('UserEmail');
                if (email) {
                    setUserEmail(email);
                }
                setLoading(false)
                router.push("/")
            }
            else {
                setLoading(false)
            }
        }
    }

    return (
        <div className={styles.container}>
            <Card className="h-[100vh] flex justify-center items-center" pages={1}>
                <div className={styles.card}>
                    <div className={`flex justify-center gap-2 mb-2 ${styles.icon}`}>
                        <FaFolderOpen fontSize={28} color="gold" />
                        <h3 className="flex items-center text-xl">File lens</h3>
                    </div>

                    <div className="mt-4 flex flex-col items-center">
                        <p className="font-semibold text-3xl">Login</p>
                    </div>
                    <Input label={"Email"} placeholder={"Your email address"} type={"text"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setEmail(e.target.value)} value={email} />
                    <Input label={"Password"} placeholder={"Your account password"} type={"password"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setUserPassword(e.target.value)} value={userPassword} />
                    <div>
                        <Button className="!w-full mt-2 font-bold" style={"primary"} type="submit" text={"Login"} height={45} action={handleLogin} />
                    </div>
                    <div className="mt-4 flex">
                        <p className="font-medium">Forgot your password ?</p>
                        <u className="font-medium cursor-pointer ml-2">click here</u>
                    </div>
                    <div className="mt-4 flex">
                        <p className="font-medium">First access ?</p>
                        <Link className="font-medium cursor-pointer ml-2" href={"/registration"}><ul>click here</ul></Link>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Login;