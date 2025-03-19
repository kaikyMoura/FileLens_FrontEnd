'use client'
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Mammoth from "mammoth";
import styles from "./styles.module.scss"


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const FileViewer = ({ file }: { file: File }) => {
    const [docxContent, setDocxContent] = useState<string | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

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

    return (
        <div className={`p-4 border rounded-lg ${styles.container}`}>
            {pdfUrl ? (
                <>
                    <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} renderMode="canvas">
                        {[...Array(numPages || 0)].map((_, index) => (
                            <Page className="" key={index} pageNumber={index + 1} scale={0.8} renderTextLayer={false} />
                        ))}
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </>
            ) : docxContent && (
                <div dangerouslySetInnerHTML={{ __html: docxContent }} />
            )}
        </div>
    );
};

export default FileViewer;