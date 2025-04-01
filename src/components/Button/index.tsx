import { useEffect, useState } from "react";
import styles from "./styles.module.scss"

const Button = ({ style, type, width, height, text, className, action }: {
    style: 'primary' | 'secondary';
    type?: 'button' | 'submit' | 'reset';
    width?: number
    height?: number
    text: string;
    className?: string;
    action?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
    const [color, setColor] = useState('')

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (action) {
            action(event)
        }
    }

    useEffect(() => {
        switch (style) {
            case 'primary':
                setColor('gold')
                break;
            case 'secondary':
                setColor('white')
        }
    }, [style])

    return (
        <>
            <button className={`${className} ${styles.styledButton}`} type={type} style={{ width: width, height: height, backgroundColor: color }} onClick={handleClick}>
                <p style={{ color: style == 'primary' ? '#161616' : '#2e2e2e' }}>{text}</p>
            </button>
        </>
    )
}

export default Button;