import { SetStateAction } from 'react'
import Button from '../Button'
import CustomWebcam from '../CustomWebCam'
import styles from './styles.module.scss'

// interface ModalProps {
// id: string
// isModalOpen: boolean
// type: string
// closeModal: () => void
// }

const Modal = (props: {
    id?: string
    isModalOpen: boolean
    type: string
    closeModal: () => void
    children: React.ReactNode
}) => {

    // const handleActivateCamera = () => {
    //     navigator.mediaDevices
    //         .getUserMedia({ video: true })
    //         .then((stream) => {
    //             console.log("Câmera ativada com sucesso!");
    //             const video = document.createElement('video');
    //             video.srcObject = stream;
    //             video.play();
    //             document.body.appendChild(video);
    //         })
    //         .catch((error) => {
    //             console.error("Erro ao acessar a câmera:", error);
    //         });
    //     setActiveCamera(true)
    // }

    return (
        <>
            {props.isModalOpen &&
                (<div className={styles.modalContainer} onClick={props.closeModal}>
                    <div className={`${styles.modal} flex flex-col`} onClick={(e) => e.stopPropagation()}>
                        {props.children}
                    </div>
                </div>
                )}
            {/* {activecamera ? <CustomWebcam close={() => setActiveCamera(false)} /> : null} */}
            {/* {notification && ( <Notification text={text} Close={close} />)} */}
        </>
    )
}

export default Modal;