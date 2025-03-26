import Image from "next/image";
import { CSSProperties, SetStateAction, useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import Modal from "../Modal";
import styles from './styles.module.scss';


const Note = (props: {
    title: string,
    content: string,
    editable: boolean,
    image?: string,
    style?: CSSProperties | undefined
    options?: boolean
    onChange?: (updatedNote: { title: string; content: string }) => void;
}) => {
    const [content, setContent] = useState(props.content)
    const [image, setImage] = useState(props.image)
    const [title, setTitle] = useState(props.title)
    const [openModal, setOpenModal] = useState(false)

    const [openSelect, setOpenSelect] = useState(false)


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



    return (
        <div className={`flex flex-col gap-2 p-2 rounded-md ${styles.note}`} onClick={(e) => e.preventDefault()}
            style={{
                ...props.style,
                width: props.style?.width || "265px",
                height: props.style?.height || "265px"
            }}>
            <div className="flex w-full justify-between p-1">
                <input className="font-semibold text-lg h-6 w-64 pointer-events-auto border-none outline-none" onClick={handleOpenModal} placeholder={props.title ? props.title : "Title"} value={props.title} />
            </div>
            <div className="w-full h-px bg-[#808080]" />
            {props.editable && (
                <>
                    {image && <Image src={image} alt="note" height={150} width={270} />}
                    <p className="pointer-events-auto p-1" onClick={handleOpenModal}>{props.content ? props.content : "Create a note..."}</p>
                </>
            )
            }
            {openModal &&
                <Modal
                    className="min-w-lg max-w-[600px] w-[200px] max-h-screen h-auto"
                    isModalOpen={openModal}
                    closeModal={handleOpenModal}
                >
                    <div className="flex w-full justify-between">
                        <input type="text" className="font-semibold text-lg p-1 border-none outline-none h-4" value={title}
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
                    <textarea
                        rows={5}
                        className="p-2 w-full resize-none overflow-hidden"
                        defaultValue={content}
                        placeholder={content ? undefined : "Create a note"}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                        onBlur={handleBlur}
                        onInput={(e) => {
                            e.currentTarget.style.height = "auto";
                            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                        }}
                    />
                    <button onClick={handleCancel}>
                        <p>close</p>
                    </button>
                </Modal>
            }
        </div>
    )
}

export default Note;