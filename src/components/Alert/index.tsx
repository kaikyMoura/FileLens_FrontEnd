import { GoInfo } from "react-icons/go";
import { MouseEventHandler, useEffect } from "react";
import styles from "./styles.module.scss";
import { FaX } from "react-icons/fa6";

interface AlertProps {
    type: "error" | "sucess" | "warning" | "notification",
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
            color = "rgba(224, 66, 18, 0.32)"
            break;
        case "sucess":
            color = "rgba(10, 231, 17, 0.32)"
            break;
        case "warning":
            color = "rgba(231, 217, 20, 0.32)"
        case "notification":
            color = "rgba(23, 165, 231, 0.32)"
    }

    useEffect(() => {

    }, [color])

    return (
        <>

            <div className={` p-4 ${styles.alert_container}`} onClick={(e) => e.stopPropagation()}>
                <div
                    style={{ borderColor: color, backgroundColor: color }}
                    role="alert"
                    className={`${styles.alert_modal} bg-[${color}] dark:bg-${color} border-l-4 dark:text-[yellow-100] p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-yellow-200 dark:hover:bg-yellow-800 transform hover:scale-105`}
                >
                    <button onClick={Close}><FaX className="absolute top-3 right-3" color={"#ededed"} fontSize={18} /></button>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center">
                            <GoInfo className={`w-5 flex-shrink-0 mr-2 text-[${color}]`} fontSize={28} color="" />
                            <h2 className="text-xl">{title}</h2>
                        </div>
                        <p className=" font-semibold">{text}</p>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={action} />
            </div>
        </>
    )
}

export default Alert;