import Button from "@/components/Button"
import Card from "@/components/Card"
import CookiesPopup from "@/components/CookiesPopup"
import CustomWebcam from "@/components/CustomWebCam"
import FileSelector from "@/components/FileSelector"
import { useLoadingContext } from "@/contexts/LoadingContextProvider"
import { useThemeContext } from "@/contexts/ThemeContextProvider"
import { extractData, uploadFile } from "@/services/fileService"
import { useNoteStore } from "@/stores/useNoteStore"
import Cookies from "js-cookie"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaX } from "react-icons/fa6"
import styles from "./styles.module.scss"

const FileViewer = dynamic(() => import('@/components/FileViewer'), {
    ssr: false
});

const fileTypes = ["image/jpeg", "image/png", "image/jpg"]

const Home = () => {
    const { setLoading } = useLoadingContext()
    const { theme, toggleTheme } = useThemeContext()
    const { addNote } = useNoteStore()

    const router = useRouter()

    const [openPopup, setOpenPopup] = useState(false)
    const [file, setFile] = useState<File | null>()
    const [isCamOpen, setIsCamOpen] = useState(false)

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

    const saveFile = async () => {
        if (!file) {
            console.error("File not found")
        }
        setLoading(true)
        console.log(file)
        const result = await uploadFile(Cookies.get('UserEmail')!, file!)
        if (result.success === true) {
            setLoading(false)
            console.log(result.message)
            console.log(result.data)
        }
        else {
            setLoading(false)
            console.log(result.error)
        }
    }

    const extractDataFromFile = async () => {
        if (!file) {
            console.error("File not found")
        }
        setLoading(true)
        console.log(file)
        const result = await extractData(file!)
        if (result.success === true) {
            setLoading(false)
            console.log(result.message)
            console.log(result.data)

            const userEmail = Cookies.get("UserEmail")
            if (!userEmail) {
                console.error("User email not found in cookies");
                return;
            }

            const response = await addNote(file?.name!, result.data!, userEmail)

            if (response.success === true) {
                router.push('/my-notes')
            }
        }
        else {
            setLoading(false)
            console.log(result.error)
        }
    }

    useEffect(() => { }, [theme, toggleTheme])

    const handleCameraOpen = async () => {
        setFile(null)
        setIsCamOpen(true)
    }

    const handleCapturedPhoto = (imageSrc: string | null) => {
        setIsCamOpen(false)
        if (imageSrc) {
            const file = new File([new Blob([imageSrc], { type: "image/png" })], "captured_photo.png", { type: "image/png" });
            setFile(file);
        }
    }

    const handleFileCapture = (capturedFile: File | null) => {
        setFile(capturedFile)
        console.log(capturedFile)
    }

    return (<>
        <div className={`flex gap-6 ${styles.container}`}>
            {!file ? (
                <Card className={styles.card} pages={1}>
                    <FileSelector handleFileCapture={handleFileCapture} />

                    <div className="font-bold text-xl mt-5 flex flex-col items-center">
                        <h3 className="text-center">Or</h3>

                        <div className="mt-5 flex justify-center">
                            <Button
                                className="font-normal"
                                style={file ? "secondary" : "primary"}
                                text={file ? "Retake picture" : "Take a picture"}
                                action={handleCameraOpen}
                                width={200}
                                height={50}
                            />
                        </div>

                        <div className="mt-5">
                            <CustomWebcam
                                handleCapturedPhoto={handleCapturedPhoto}
                                isCameraOpen={isCamOpen}
                                close={() => setIsCamOpen(!isCamOpen)}
                            />
                        </div>
                    </div>
                </Card>
            ) : null}

            {file && fileTypes.includes(file.type as string) && (
                <div className="mt-8 p-4 border rounded-lg">
                    <FaX className="flex fixed z-50 cursor-pointer mt-6 ml-6"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={"Exit"}
                        color="white" fontSize={20} onClick={() => setFile(null)} />
                    <Image src={file instanceof File ? URL.createObjectURL(file) : ""} alt="Captured photo" height={600} width={800} />
                </div>
            )}

            {file && !fileTypes.includes(file.type as string) && (
                <div className="">
                    {typeof file === 'string' ? null : <FileViewer className="h-[350px] w-[400px]" file={file} onClose={() => setFile(null)} />}
                </div>
            )}

            {file ? (
                <>
                    <Card className="flex justify-center mt-10" pages={1}>
                        <div className="flex flex-col items-center gap-6 font-semibold text-lg">
                            <h3 className="font-bold text-xl mb-4">What do you want to do with this file?</h3>
                            <Button
                                className="text-lg font-normal"
                                type="button"
                                style="primary"
                                text="Save file"
                                action={saveFile}
                                width={200}
                                height={50}
                            />

                            <Button
                                type="button"
                                style="primary"
                                text="Extract data to a note"
                                className="text-lg font-normal"
                                action={extractDataFromFile}
                                width={200}
                                height={50}
                            />

                            <Button
                                className="text-lg font-normal"
                                type="button"
                                style="primary"
                                text="Convert file"
                                action={handleCameraOpen}
                                width={200}
                                height={50}
                            />
                        </div>
                    </Card>
                </>
            ) : null}
        </div >
        {openPopup && <CookiesPopup close={handleSetCookies} />}
    </>)
}

export default Home