import Image from "next/image";
import { MouseEventHandler, useCallback, useRef, useState } from "react";
import { FaX } from "react-icons/fa6";
import Webcam from "react-webcam";
import Button from "../Button";
import styles from "./styles.module.scss";

const CustomWebcam = (props: {
    close?: MouseEventHandler<HTMLButtonElement>,
    isCameraOpen?: boolean,
    handleCapturedPhoto?: (image: string | null) => void
}) => {
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>('');

    const retake = () => {
        setImgSrc(null);
    }

    const save = () => {
        props.handleCapturedPhoto!(imgSrc);
    }

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc)
        }
    }, [webcamRef])

    return (
        <>
            {props.isCameraOpen && (
                <div className={`${styles.container}`}>
                    <button onClick={props.close}>
                        <FaX className="flex absolute z-50 cursor-pointer mt-4 ml-4" color="black" fontSize={20} />
                    </button>
                    {imgSrc ? (
                        <>
                            <Image src={imgSrc} alt="webcam" height={600} width={600} />
                        </>
                    )
                        :
                        (
                            <Webcam className="" width={600} ref={webcamRef} audio={false}
                                screenshotFormat="image/jpeg" videoConstraints={{
                                    facingMode: 'environment'
                                }} />
                        )
                    }
                    <div className="flex justify-center mt-10">
                        {imgSrc ?
                            (
                                <div className="flex flex-col gap-6">
                                    <Button style={"secondary"} width={200} height={50} text={"Retake photo"} action={retake} />
                                    <Button style={"primary"} width={200} height={50} text={"Save photo"} action={save} />
                                </div>
                            )
                            :
                            (
                                <Button className="" style={"primary"} width={200} height={50} text={"Capture photo"} action={capture} />
                            )
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default CustomWebcam;