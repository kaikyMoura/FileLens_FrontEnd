import Card from "@/components/Card"
import FileSelector from "@/components/FileSelector"
import { useLoadingContext } from "@/contexts/LoadingContextProvider"
import { useThemeContext } from "@/contexts/ThemeContextProvider"
import { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import CustomWebcam from "@/components/CustomWebCam"
import Button from "@/components/Button"
import Image from "next/image"

const Home = () => {
    const { setLoading } = useLoadingContext()
    const { theme, toggleTheme } = useThemeContext()

    const [photo, setPhoto] = useState<string | null>('')

    const [isCamOpen, setIsCamOpen] = useState(false)

    useEffect(() => { }, [theme, toggleTheme])

    const handleCameraOpen = async () => {
        setIsCamOpen(true)
    }

    const handleCapturedPhoto = (imageSrc: string | null) => {
        setPhoto(imageSrc)
    }

    return (<>
        <div className={styles.container}>
            <Card className={styles.card} pages={1}>
                <FileSelector />
                <div className="font-bold text-xl flex flex-col">
                    <h3 className="mt-5 flex justify-center">Or</h3>
                    <div className="flex justify-center mt-5">
                        <Button type={"primary"} text={"Take a picture"} action={handleCameraOpen} width={200} height={50} />
                    </div>
                    <CustomWebcam handleCapturedPhoto={handleCapturedPhoto} isCameraOpen={isCamOpen} close={() => setIsCamOpen(!isCamOpen)} />
                </div>
            </Card >
            {photo && (
                <>
                    <Image src={photo} alt="webcam" height={600} width={600} />
                </>
            )
            }
        </div >
    </>)
}

export default Home