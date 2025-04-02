'use client'
import Mammoth from "mammoth";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./styles.module.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaX } from "react-icons/fa6";


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const FileViewer = ({ file, className, onClose }: { file: File, className?: string, onClose?: () => void }) => {
    const [docxContent, setDocxContent] = useState<string | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1);

    const [openDropdown, setOpenDropdown] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                setScale(containerWidth / 650);
            }
        }

        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, [scale])

    useEffect(() => {
        console.log(file.type)
        if (!file) return;

        if (file.type === "application/pdf") {
            setPdfUrl(URL.createObjectURL(file));
        } else if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                const result = await Mammoth.convertToHtml({ arrayBuffer });
                setDocxContent(result.value);
            };
            reader.readAsArrayBuffer(file);
        }
    }, [file]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        setNumPages(numPages);
    }

    const handleClose = () => {
        setPdfUrl(null);
        setDocxContent(null);
    };

    return (
        <div ref={containerRef} className={`p-4 rounded-lg ${styles.file_viewer_container}`}>
            {pdfUrl ? (
                <div className="flex flex-col">
                    <button
                        type="button"
                        onClick={() => setOpenDropdown(!openDropdown)}
                        className={`w-full flex items-center justify-between cursor-pointer ${styles.file_viewer__button}`}
                    >
                        <p>{file.name}</p>
                        <IoIosArrowForward className={`ml-2 ${styles.arrow} ${openDropdown ? "rotate-90" : ""}`} fontSize={20} />
                    </button>
                    {openDropdown && (
                        <>
                            <FaX className="flex absolute z-150 cursor-pointer mt-10 ml-2"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={"Exit"}
                                color="black" fontSize={20} onClick={onClose} />
                            <Document className={`${className}`} file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} renderMode="canvas">

                                <Page pageNumber={currentPage} renderTextLayer={false} renderAnnotationLayer={false} scale={scale} />

                            </Document>
                            <div className="flex items-center gap-2 fixed bottom-10 z-50 cursor-pointer text-[#808080]">
                                {currentPage > 1 && (
                                    <IoIosArrowBack className={`cursor-pointer ${styles.arrow}`} fontSize={20}
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={"Previous page"}
                                        onClick={() => setCurrentPage((prevState) => Math.min(prevState - 1, 1))} />
                                )}
                                <p className="">
                                    Page {pageNumber} of {numPages}
                                </p>
                                {numPages !== currentPage && (
                                    <IoIosArrowForward className={`cursor-pointer ${styles.arrow}`} fontSize={20}
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={"Next page"}
                                        onClick={() => setCurrentPage((prevState) => Math.min(prevState + 1, numPages))} />
                                )}
                            </div>
                        </>
                    )}
                </div>
            ) : docxContent && (
                <div dangerouslySetInnerHTML={{ __html: docxContent }} />
            )}

        </div>
    );
};

export default FileViewer;