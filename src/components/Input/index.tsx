import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa6';
import styles from './styles.module.scss';
import { FaCheckSquare, FaRegCheckSquare } from 'react-icons/fa';

export interface InputProps {
    onClick?: MouseEventHandler<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    label?: string;
    value?: string | undefined;
    placeholder?: string;
    type?: "text" | "password" | "email" | "number" | "file" | "checkbox";
    maxLength?: number;
    accept?: string
}

const Input = ({ onClick, onChange, type, label, placeholder, value, maxLength, accept }: InputProps) => {
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
                <input className={`${styles.input}`} type={type === "password" && showPassword ? "text" : type}
                    onClick={onClick} placeholder={placeholder} onChange={onChange} value={value} maxLength={maxLength} accept={accept} />
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