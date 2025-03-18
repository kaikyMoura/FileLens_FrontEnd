import { FaCloudArrowUp } from "react-icons/fa6";
import styles from './styles.module.scss'

const FileSelector = () => {

    return (
        <form action="" className={styles.fileUploadForm}>
            <label htmlFor="file" className={styles.fileUploadLabel}>
                <div className={`${styles.fileUploadDesign}`}>
                    <FaCloudArrowUp className={styles.icon} fontSize={34} color="gold"/>
                    <p>Drag and Drop</p>
                    <p>or</p>
                    <span className={`font-lg ${styles.browseButton}`}>Select files to upload</span>
                </div>
                <input id={styles.fileInput} type="file" />
            </label>
        </form>
    )
}

export default FileSelector;