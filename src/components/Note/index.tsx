import { genereteFileFromText } from "@/services/fileService";
import Image from "next/image";
import { CSSProperties, SetStateAction, useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import { IoMdArrowForward, IoMdMenu, IoMdMore } from "react-icons/io";
import TextareaAutosize from 'react-textarea-autosize';
import Modal from "../Modal";
import styles from './styles.module.scss';


const Note = (props: {
    title: string,
    content: string,
    editable: boolean,
    image?: string,
    style?: CSSProperties | undefined,
    options?: boolean,
    onChange?: (updatedNote: { title: string; content: string }) => void,
    handleDelete?: () => void,
    handleDrop?: (event: React.DragEvent<SVGAElement>) => void
}) => {
    const [content, setContent] = useState(props.content)
    const [image, setImage] = useState(props.image)
    const [title, setTitle] = useState(props.title)
    const [openModal, setOpenModal] = useState(false)

    const [openSelect, setOpenSelect] = useState(false)
    const [openExportOptions, setOpenExportOptions] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    const handleBlur = () => {
        if (!props.editable) return;

        if (title !== props.title || content !== props.content) {
            props.onChange!({ title: title, content: content });
        }
    };

    const handleCancel = () => {
        setTitle(props.title);
        setContent(props.content);
        if (props.editable) {
            setOpenModal(false);
        }
    }

    useEffect(() => {
        setTitle(props.title);
        setContent(props.content);
    }, [props.title, props.content]);

    /**
     * Generates a file from a given text, with an optional title and content type.
     * The function returns a promise that resolves with an object containing the generated file as a blob,
     * and the content type of the generated file.
     *
     * @param {string} type - The type of file to be generated.
     * @param {string} content - The content of the file to be generated.
     * @param {string} title - The title of the file to be generated.
     * @return void
     */
    const downloadFile = async (type: string) => {
        const response = await genereteFileFromText(type, content, title);

        if (response.success === true) {
            const contentDisposition = response.headers["content-disposition"] || response.headers.get("content-disposition");
            const contentType = response.headers["content-type"] || response.headers.get("content-type");

            const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
            const fileName = fileNameMatch ? fileNameMatch[1] : "downloaded-file";

            console.log("Response Data:", response.data);
            console.log("Tipo do response.data:", typeof response.data);
            console.log("Tamanho do response.data:", response.data?.byteLength);

            const blob = new Blob([new Uint8Array(response.data!)], { type: contentType });
            const url = URL.createObjectURL(blob);

            console.log(blob)

            const link = document.createElement("a");
            try {
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
            }
            catch (err) {
                console.error(response.error)
            }
            finally {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
        }
    }

    return (
        <div className={`flex flex-col p-2 rounded-md ${styles.note}`} onClick={(e) => e.preventDefault()}
            style={{
                ...props.style
            }}>
            <div className="flex justify-between items-center p-1">
                <div className="flex gap-2">
                    <IoMdMenu className="cursor-pointer" fontSize={26} color="#808080" onDrag={props.handleDrop} />
                    <input className="font-semibold text-lg h-6 w-full pointer-events-auto border-none outline-none"
                        onClick={handleOpenModal} readOnly placeholder={props.title ? props.title : "Title"} value={props.title} />
                </div>
                {props.options ? (
                    <div>
                        <IoMdMore className="cursor-pointer" fontSize={26} color="#808080" onClick={() => setOpenSelect(!openSelect)} />
                        {openSelect && (
                            <div
                                className="absolute mt-2 max-w-48 rounded-md shadow-lg bg-(--component-color)"
                                onMouseLeave={() => setOpenSelect(false)}
                            >
                                <ul className="p-2 space-y-1">
                                    <li
                                        className="cursor-pointer px-3 py-2 hover:bg-[#4e4e4e] rounded-md transition duration-150" >
                                        <div className="relative">
                                            <button className="w-full flex items-center gap-2" type="button" onMouseEnter={() => setOpenExportOptions(true)}>
                                                <p>Export to</p>
                                                <IoMdArrowForward fontSize={16} color="#808080" />
                                            </button>
                                            {openExportOptions && (
                                                <div className="absolute ml-26 -mt-10 max-w-48 rounded-md shadow-lg bg-(--component-color)"
                                                    onMouseLeave={() => setOpenExportOptions(false)}
                                                >
                                                    <ul className="p-2 space-y-1">
                                                        {Object.values({ txt: ".txt", pdf: ".pdf", docx: ".docx" }).map((item) => (
                                                            <li
                                                                className="cursor-pointer flex justify-between gap-4 items-center px-3 py-2 hover:bg-[#4e4e4e] rounded-md transition duration-150"
                                                                onClick={() => downloadFile(item)}
                                                            >
                                                                <p>{item}</p>
                                                                <FaDownload className="ml-auto" fontSize={16} color="#808080" />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                    <li
                                        className="cursor-pointer px-3 py-2 hover:bg-[#4e4e4e] rounded-md transition duration-150"
                                        onClick={props.handleDelete}
                                    >
                                        Delete
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
            <div className="w-full h-px bg-[#808080]" />
            {props.editable && props.content && (
                <>
                    {image && <Image src={image} alt="note" height={150} width={270} />}
                    <TextareaAutosize className={`pointer-events-auto p-1 mt-2 resize-none ${styles.textareaNote}`} onClick={handleOpenModal}
                        defaultValue={props.content}
                        placeholder={props.content ? undefined : "Create a note..."} />
                </>
            )
            }
            {openModal &&
                <Modal
                    className="min-w-lg max-w-[600px] max-h-screen"
                    isModalOpen={openModal}
                    closeModal={handleOpenModal}
                >
                    <div className="flex justify-between p-1">
                        <input type="text" className="font-semibold w-full text-lg p-1 border-none outline-none h-4" value={title}
                            onChange={(e: { target: { value: SetStateAction<string> } }) => setTitle(e.target.value)}
                            onBlur={handleBlur} placeholder={title ? undefined : "Title"} />

                        {props.options ? (
                            <>
                                <IoMdMore className="cursor-pointer" fontSize={26} color="#808080" onClick={() => setOpenSelect(!openSelect)} />
                                {openSelect &&
                                    <select className="relative p-2" onClick={(e) => e.preventDefault()} onMouseLeave={() => setOpenSelect(false)}>
                                        <option value="">Delete</option>
                                    </select>
                                }
                            </>
                        ) : null}
                    </div>
                    <div className="w-full h-px bg-[#808080]" />
                    <TextareaAutosize className={`pointer-events-auto p-1 mt-2 resize-none outilne-none ${styles.textareaNote}`}
                        defaultValue={props.content}
                        placeholder={props.content ? undefined : "Create a note..."}
                        onInput={(e) => {
                            const target = e.currentTarget;
                            target.style.height = "auto";
                            target.style.height = `${target.scrollHeight}px`;
                        }}
                        value={content}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                        onBlur={handleBlur} />
                    <button className={`${styles.modal_close_button} flex items-center justify-end mt-2 p-2 border-md`} onClick={handleCancel}>
                        <p className="rounded-md p-2">Close</p>
                    </button>
                </Modal>
            }
        </div>
    )
}

export default Note;