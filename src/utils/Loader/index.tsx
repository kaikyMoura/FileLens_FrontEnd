import { FaFolder, FaFolderOpen } from 'react-icons/fa6';
import styles from './styles.module.scss'
import { useState, useEffect } from 'react';

const Loader = () => {

    const [open, setOpen] = useState(false);

    // Alterna o estado de "abrir/fechar" com intervalo
    useEffect(() => {
        const interval = setInterval(() => {
            setOpen((prev) => !prev);
        }, 700); // Velocidade da animação

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${styles.modal}`}>
            <div className={`${styles.loader}`}/>
        </div>
    )
}

export default Loader;