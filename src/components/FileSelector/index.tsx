import { FaCloudArrowUp } from "react-icons/fa6";
import styles from './styles.module.scss'
import { ChangeEventHandler, useCallback, useRef, useState } from "react";

const FileSelector = (props: { handleFileCapture: (file: File | null) => void }) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [file, setFile] = useState<File | null>(null);

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            setFile(files[0]);
        }
        console.log(file)
        props.handleFileCapture(file)
    }, [file]);

    const handleFileClick = (event: any) => {
        event.preventDefault()
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = (event: { target: { files: FileList | null } }) => {
        const file = event.target.files?.[0]
        console.log(file)
        file ? props.handleFileCapture(file!) : null
    };

    return (
        <form className={styles.fileUploadForm}>
            <div className={styles.fileUpload} onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}>
                <div className={`${styles.fileUploadDesign}`}>
                    <FaCloudArrowUp className={styles.icon} fontSize={34} color="gold" />
                    <p>Drag and Drop</p>
                    <p>or</p>
                    <button className={`font-normal text-lg ${styles.browseButton}`} type="button" onClick={handleFileClick}>
                        <p>Select files to upload</p>
                    </button>
                </div>
            </div>
            <input className="hidden" ref={fileInputRef} type="file" onChange={handleFileUpload} />
        </form>
    )
}

export default FileSelector;