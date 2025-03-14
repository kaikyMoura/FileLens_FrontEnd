import Button from "@/components/Button"
import Card from "@/components/Card"
import Input from "@/components/Input"
import { useLoadingContext } from "@/contexts/LoadingContextProvider"
import { useRouter } from "next/router"
import { SetStateAction, useState } from "react"
import { FaFile } from "react-icons/fa6"
import styles from "./styles.module.scss"
import Link from "next/link"

const Login = () => {
    const router = useRouter()
    const { setLoading } = useLoadingContext()
    // const { setIsAuthenticated } = useAuthContext()

    const [email, setEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const doLogin = async () => {
        router.replace("/dashboard")
    }
    return (
        <div className={styles.container}>
            <Card className="h-[100vh] flex justify-center items-center" pages={1}>
                <div className={styles.card}>
                    <div className={`flex justify-center gap-2 mb-2 ${styles.icon}`}>
                        <FaFile fontSize={28} color="gold" />
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
                        <Button className="!w-full mt-2 font-bold" type={"primary"} text={"Login"} height={45} action={doLogin} />
                    </div>
                    <div className="mt-4 flex">
                        <p className="font-medium">Forgot your password ?</p>
                        <u className="font-medium cursor-pointer ml-2">click here</u>
                    </div>
                    <div className="mt-4 flex">
                        <p className="font-medium">First account ?</p>
                        <Link className="font-medium cursor-pointer ml-2" href={"/registration"}><ul>click here</ul></Link>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Login;