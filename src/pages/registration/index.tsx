import Button from "@/components/Button";
import Card from "@/components/Card";
import CheckBox from "@/components/Checkbox";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useLoadingContext } from "@/contexts/LoadingContextProvider";
import { User } from "@/model/User";
import Link from "next/link";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { FaFolderOpen, FaX } from "react-icons/fa6";
import styles from "./styles.module.scss";
import { signup } from "@/api/services/userService";

const Signup = () => {
    const router = useRouter()
    const { setLoading } = useLoadingContext()

    const [openModal, setOpenModal] = useState(false)

    const [checked, setChecked] = useState(false)

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [repeatEmail, setRepeatEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [repeatUserPassword, setRepeatUserPassword] = useState('')


    useEffect(() => {
    }, [])
    setLoading(false)


    const createUser = async () => {
        if (email !== repeatEmail) {

        }
        if (userPassword !== repeatUserPassword) {

        }

        const user: User = {
            user_name: userName,
            email: email,
            user_password: userPassword,
        }

        setLoading(true)
        if (user && checked) {
            const response = await signup(user)
            if (response.success === true) {
                setLoading(false)
                router.replace("/login")
            }
            else {
                setLoading(false)
            }
        }
    }

    return (
        <>
            <div className={`${styles.container} flex flex-col`}>
                <Card className="h-[100vh] flex justify-center items-center" pages={1}>
                    <div className={styles.card}>
                        <div className={`flex justify-center gap-2 mb-2 ${styles.icon}`}>
                            <FaFolderOpen fontSize={28} color="gold" />
                            <h3 className="flex items-center text-xl">File lens</h3>
                        </div>
                        <Input label={"User name"} placeholder={"User name"} type={"text"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setUserName(e.target.value)} value={userName} />
                        <Input label={"Email"} placeholder={"Your email address"} type={"text"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setEmail(e.target.value)} value={email} />
                        <Input label={"Repeat email"} placeholder={"Confirm your email adress"} type={"text"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setRepeatEmail(e.target.value)} value={repeatEmail} />
                        <Input label={"Password"} placeholder={"Create a strong password"} type={"password"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setRepeatUserPassword(e.target.value)} value={repeatUserPassword} />
                        <Input label={"Confirm password"} placeholder={"Confirm yout password"} type={"password"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setUserPassword(e.target.value)} value={userPassword} />
                        <div className="flex gap-4">
                            <CheckBox value={checked} onChange={setChecked} />
                            <div className="flex flex-wrap items-center gap-1.5 w-full text-sm">
                                <span>I accept the</span>
                                <span className="font-semibold">FileLens</span>
                                <button
                                    type="button"
                                    className="cursor-pointer text-[gold] underline"
                                    onClick={() => setOpenModal(true)}
                                >
                                    Terms of Use
                                </button>
                                <span>and</span>
                                <button
                                    type="button"
                                    className="cursor-pointer text-[gold] underline"
                                    onClick={() => setOpenModal(true)}
                                >
                                    Privacy Policy
                                </button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button className="!w-full font-bold" style={"primary"} text={"Join now"} type="submit" height={45} action={createUser} />
                        </div>
                        <div className="mt-4 flex">
                            <p className="font-medium">Already have a account ?</p>
                            <Link className="ml-2" href={"/login"}>
                                <u className="font-medium cursor-pointer ml-2">click here</u>
                            </Link>
                        </div>
                    </div>
                </Card >
            </div >

            {openModal && <Modal isModalOpen={openModal} type={""} closeModal={() => setOpenModal(!openModal)}>
                <section>
                    <button className="fixed ml-[100%]" onClick={() => setOpenModal(!openModal)}>
                        <FaX fontSize={20} color="black" />
                    </button>
                    <h1 className="font-semibold text-2xl text-yellow-400">Terms of Service & Privacy Policy</h1>
                    <p className="text-end"><strong>Effective Date:</strong> 03/13/2025</p>

                    <br />
                    <p>Welcome to <strong>FileLens</strong>. This application is provided <em>for educational and experimental purposes only</em>, under the MIT License. By using this application, you agree to the following terms:</p>
                    <br />
                    <h2>1. Non-Commercial Use</h2>
                    <p>FileLens is not intended for commercial use. The app is provided <em>as-is</em>, without warranties, and is developed solely for learning, research, and demonstration of AI-powered image recognition.</p>

                    <h2>2. MIT License</h2>
                    <p>
                        This software follows the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a>.
                        You are free to use, copy, modify, merge, publish, and distribute copies of the software, provided that the original copyright notice and permission notice are included in all copies.
                    </p>

                    <h2>3. Privacy and Data Usage</h2>
                    <ul>
                        <li><strong>Data Processing:</strong> Files uploaded are processed temporarily for AI analysis. No personal data is stored or sold.</li>
                        <li><strong>Third-Party Services:</strong> The AI models used may process uploaded files as part of their service. We do not guarantee data confidentiality.</li>
                        <li><strong>Cookies:</strong> Non-essential cookies may be used for UI preferences.</li>
                    </ul>
                    <br />
                    <h2>4. Limitation of Liability</h2>
                    <p>The application is provided <em>&quot;as-is&quot;</em>, without warranty. We are not liable for any damages arising from the use or inability to use this application.</p>

                    <br />                    <h2>5. Changes to Terms</h2>
                    <p>We may update these terms. Continued use of the app means you accept the updated terms.</p>
                </section >


            </Modal >}
        </>
    )
}

export default Signup;