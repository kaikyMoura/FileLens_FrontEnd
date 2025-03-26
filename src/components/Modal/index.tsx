import styles from './styles.module.scss'

const Modal = (props: {
    id?: string
    className?: string
    isModalOpen: boolean
    closeModal: () => void
    children: React.ReactNode
}) => {

    return (
        <>
            {props.isModalOpen &&
                (<div className={styles.modalContainer} onClick={props.closeModal}>
                    <div className={`${styles.modal} ${props.className} flex flex-col`} onClick={(e) => e.stopPropagation()}>
                        {props.children}
                    </div>
                </div>
                )}
        </>
    )
}

export default Modal;