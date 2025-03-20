import { useEffect, useState } from "react";
import styles from "./styles.module.scss"

const Button = (props: {
    style: 'primary' | 'secondary';
    type?: 'button' | 'submit' | 'reset';
    width?: number
    height?: number
    text: string;
    className?: string;
    action?: (event: { preventDefault: () => void }) => {}
}) => {
    const [color, setColor] = useState('')

    const handleClick = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        if (props.action) {
            props.action(event)
        }
    }

    useEffect(() => {
        switch (props.style) {
            case 'primary':
                setColor('gold')
                break;
            case 'secondary':
                setColor('white')
        }
    }, [props.style])

    return (
        <>
            <button className={`${props.className} ${styles.styledButton}`} type={props.type} style={{ width: props.width, height: props.height, backgroundColor: color }} onClick={handleClick}>
                <p style={{ color: props.style == 'primary' ? '#161616' : '#2e2e2e' }}>{props.text}</p>
            </button>
        </>
    )
}

export default Button;