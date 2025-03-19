import { MouseEventHandler, useEffect } from "react";
import styles from "./notification.module.css";
import { FaX } from "react-icons/fa6";

interface AlertProps {
    type: "error" | "sucess" | "notification",
    Close?: MouseEventHandler<HTMLButtonElement> | undefined,
    title: string,
    image?: string
    text: string | undefined
    action?: () => void
}

const Alert = ({ Close, title, type, text, action }: AlertProps) => {

    let color
    switch (type) {
        case "error":
            color = "red"
            break;
        case "sucess":
            color = "#2fc52d"
            break;
        case "notification":
            color = "lightblue"
    }

    useEffect(() => {

    }, [color])

    return (
        <>
            <div className={`${styles.modalBlur}`} style={{ borderColor: color }} onClick={(e) => e.stopPropagation()}>
                <button onClick={Close}><FaX color={"black"} fontSize={26} /></button>
                <div>
                    <h2 className="text-lg" style={{ color: color }}>{title}</h2>
                    <div className="flex items-center justify-center">
                        <p className="font-lg">{text}</p>
                    </div>
                    <button onClick={action} />
                </div>
            </div>
        </>
    )
}

export default Alert;