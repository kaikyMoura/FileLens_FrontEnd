import styles from './styles.module.scss'

const Modal = (props: {
    id?: string
    isModalOpen: boolean
    type: string
    closeModal: () => void
    children: React.ReactNode
}) => {

    return (
        <>
            {props.isModalOpen &&
                (<div className={styles.modalContainer} onClick={props.closeModal}>
                    <div className={`${styles.modal} flex flex-col`} onClick={(e) => e.stopPropagation()}>
                        {props.children}
                    </div>
                </div>
                )}
        </>
    )
}

export default Modal;