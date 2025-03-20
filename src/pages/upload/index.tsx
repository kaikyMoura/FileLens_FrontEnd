import Card from "@/components/Card"
import FileSelector from "@/components/FileSelector"
import { useLoadingContext } from "@/contexts/LoadingContextProvider"
import { useThemeContext } from "@/contexts/ThemeContextProvider"
import { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import CustomWebcam from "@/components/CustomWebCam"
import Button from "@/components/Button"
import Image from "next/image"
import dynamic from "next/dynamic"
import { FaX } from "react-icons/fa6"
import { extractData, uploadFile } from "@/api/services/fileService"
import { useUserContext } from "@/contexts/UserInfoContextProvider"
import Cookies from "js-cookie"

const FileViewer = dynamic(() => import('@/components/FileViewer'), {
    ssr: false
});

const Upload = () => {
    const { setLoading } = useLoadingContext()
    const { theme, toggleTheme } = useThemeContext()

    const fileTypes = ["image/jpeg", "image/png", "image/jpg"]

    const [file, setFile] = useState<File | null>()


    const [isCamOpen, setIsCamOpen] = useState(false)

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
        <div className={`flex gap-4 ${styles.container}`}>
            {!file ? (
                <Card className={styles.card} pages={1}>
                    <FileSelector handleFileCapture={handleFileCapture} />

                    <div className="font-bold text-xl mt-5 flex flex-col items-center">
                        <h3 className="text-center">Or</h3>

                        <div className="mt-5 flex justify-center">
                            <Button
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
                <div className="mt-[5em]">
                    <FaX className="flex absolute z-50 cursor-pointer mt-6 ml-6"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={"Exit"}
                        color="black" fontSize={20} onClick={() => setFile(null)} />
                    {typeof file === 'string' ? null : <FileViewer file={file} />}
                </div>
            )}

            {file ? (
                <>
                    <Card className="flex justify-center mt-8" pages={1}>
                        <div className="flex flex-col items-center gap-6 font-semibold text-lg">
                            <h3 className="font-bold text-xl mb-4">What do you want to do with this file?</h3>

                            <Button
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
                                text="Extract data from file"
                                action={extractDataFromFile}
                                width={200}
                                height={50}
                            />

                            <Button
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
    </>)
}

export default Upload