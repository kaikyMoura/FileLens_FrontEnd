import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa6';
import styles from './styles.module.scss';

export interface InputProps {
    onClick?: MouseEventHandler<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    label?: string;
    value?: string | undefined;
    placeholder?: string;
    type?: "text" | "password" | "email" | "number" | "file" | "checkbox";
    maxLength?: number;
    accept?: string;
    className?: string;
}

const Input = ({ onClick, onChange, type, label, placeholder, value, maxLength, className }: InputProps) => {
    const [changeIcon, setChangeIcon] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    let icon
    if (type === "password") {
        icon = <FaLock fontSize={22} color='black' />;
    } 
    else if (type === undefined) {
        type = "text"
    }
    else {
        icon = null;
    }

    const handleIconChange = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        if (changeIcon == false) {
            setShowPassword(true)
            setChangeIcon(true)
        }
        else {
            setShowPassword(false)
            setChangeIcon(false)
        }
    }

    return (
        <>
            <div className={`${styles.inputButton}`}>
                <label>{label}</label>
                <input className={`${styles.input} ${className}`} type={type === "password" && showPassword ? "text" : type}
                    onClick={onClick} placeholder={placeholder} onChange={onChange} value={value} maxLength={maxLength}/>
                {type === "password" && (
                    <>
                        {!changeIcon ?
                            <button className='' onClick={handleIconChange}>
                                <i>{icon}</i>
                            </button>
                            :
                            <button className='' onClick={handleIconChange}>
                                <i>{icon = <FaUnlock fontSize={22} color='black' />}</i>
                            </button>
                        }
                    </>
                )}
            </div >
        </>
    )
}

export default Input;