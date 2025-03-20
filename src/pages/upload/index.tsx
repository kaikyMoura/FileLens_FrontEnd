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
import { uploadFile } from "@/api/services/fileService"
import { useUserContext } from "@/contexts/UserInfoContextProvider"
import Cookies from "js-cookie"

const FileViewer = dynamic(() => import('@/components/FileViewer'), {
    ssr: false
});

const Upload = () => {
    const { setLoading } = useLoadingContext()
    const { theme, toggleTheme } = useThemeContext()
    const { user } = useUserContext()

    const fileTypes = ["image/jpeg", "image/png", "image/jpg"]

    const [file, setFile] = useState<File | null>()
    const [photo, setPhoto] = useState<string | null>()


    const [isCamOpen, setIsCamOpen] = useState(false)

    const saveFile = async () => {
        if(!file) {
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

    useEffect(() => { }, [theme, toggleTheme])

    const handleCameraOpen = async () => {
        setFile(null)
        setPhoto(null)
        setIsCamOpen(true)
    }

    const handleCapturedPhoto = (imageSrc: string | null) => {
        setIsCamOpen(false)
        setPhoto(imageSrc)
    }

    const handleFileCapture = (capturedFile: File | null) => {
        setPhoto(null)
        setFile(capturedFile)

        console.log(file)
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

            {photo && (
                <div className="mt-8 flex justify-center">
                    <Image src={`${file && fileTypes.includes(file.type) ? file : photo}`} alt="Captured photo" height={250} width={300} />
                </div>
            )}

            {file && (
                <div className="mt-[5em]">
                    <FaX className="flex absolute z-50 cursor-pointer mt-6 ml-6"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={"Exit"}
                        color="black" fontSize={20} onClick={() => setFile(null)} />
                    <FileViewer file={file} />
                </div>
            )}

            {photo || file ? (
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
                                action={handleCameraOpen}
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