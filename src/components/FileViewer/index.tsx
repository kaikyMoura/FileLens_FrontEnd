'use client'
import Mammoth from "mammoth";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./styles.module.scss";
import { IoIosArrowForward } from "react-icons/io";
import { FaX } from "react-icons/fa6";


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const FileViewer = ({ file, className }: { file: File, className?: string }) => {
    const [docxContent, setDocxContent] = useState<string | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber] = useState<number>(1);

    const [openDropdown, setOpenDropdown] = useState(false);

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
        <div className={`p-4 rounded-lg ${styles.container}`}>
            {pdfUrl ? (
                <div className="flex flex-col">
                    <button
                        type="button"
                        onClick={() => setOpenDropdown(!openDropdown)}
                        className={`flex items-center justify-between cursor-pointer ${styles.modalInput}`}
                    >
                        <p>{file.name}</p>
                        <IoIosArrowForward className={`ml-2 ${styles.arrow} ${openDropdown ? "rotate-90" : ""}`} fontSize={20} />
                    </button>
                    {openDropdown && (
                        <>
                            <FaX className="flex absolute z-150 cursor-pointer mt-6 ml-6"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={"Exit"}
                                color="black" fontSize={20} onClick={() => handleClose} />
                            <Document className={`max-w-full ${className}`} file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} renderMode="canvas">
                                {[...Array(numPages || 0)].map((_, index) => (
                                    <Page key={index} pageNumber={index + 1} scale={0.8} renderTextLayer={false} />
                                ))}
                            </Document>
                            <p className="fixed bottom-10 z-50 cursor-pointer mt-6 ml-6">
                                Page {pageNumber} of {numPages}
                            </p>
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