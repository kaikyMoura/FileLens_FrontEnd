import { useRef, useState, useCallback } from "react";
import styles from "./styles.module.scss"
import Webcam from "react-webcam";
import Button from "../Button";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CustomWebcam = ({ close }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const retake = () => {
        setImgSrc(null);
    }

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getEcreenshot();
        setImgSrc(imageSrc)
    }, [webcamRef])

    return (
        <>
            <div className={`${styles.container}`}>
                <FontAwesomeIcon className="flex left-[80%]" icon={faX} fontSize={20} onClick={close} />
                {imgSrc ? (
                    <Image src={imgSrc} alt="webcam" />
                )
                    :
                    (
                        <Webcam className="" height={600} width={600} ref={webcamRef} videoConstraints={{
                            facingMode: 'user'
                        }} />
                    )
                }
                <div>
                    {imgSrc ?
                        (
                            <Button type={"secondary"} text={"Retake photo"} action={retake} />
                        )
                        :
                        (
                            <Button type={"primary"} text={"Capture photo"} action={capture} />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default CustomWebcam;