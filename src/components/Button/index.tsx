import { useEffect, useState } from "react";
import styles from "./styles.module.scss"

const Button = (props: {  
    type: 'primary' | 'secondary';
    width?: number
    height?: number
    text: string;
    className?: string;
    action?: (event: { preventDefault: () => void }) => {} }) => {
    const [color, setColor] = useState('')

    const handleClick = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        if (props.action) {
            props.action(event)
        }
    }

    useEffect(() => {
        switch (props.type) {
            case 'primary':
                setColor('gold')
                break;
            case 'secondary':
                setColor('white')
        }
    }, [props.type])

    return (
        <>
            <button className={`${props.className} ${styles.styledButton}`} style={{ width: props.width, height: props.height, backgroundColor: color }} onClick={handleClick}>
                <p style={{ color: props.type == 'primary' ? '#161616': '#2e2e2e' }}>{props.text}</p>
            </button>
        </>
    )
}

export default Button;