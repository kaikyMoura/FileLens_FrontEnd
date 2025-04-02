import Alert from "@/components/Alert";
import Note from "@/components/Note";
import { useLoadingContext } from "@/contexts/LoadingContextProvider";
import { INote, useNoteStore } from "@/stores/useNoteStore";
import Cookies from "js-cookie";
import { DragEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";

const MyNotes = () => {
    const { addNote, deleteNote, fetchNotes, updateNote } = useNoteStore();
    const { setLoading } = useLoadingContext();

    const [alert, setAlert] = useState(false)

    const [alertTitle, setAlertTitle] = useState("")
    const [alertText, setAlertText] = useState("")
    const [alertType, setAlertType] = useState<"error" | "sucess" | "warning" | "notification">("sucess")


    const [notes, setNotes] = useState<INote[]>([])

    const fetchNotesData = async () => {
        try {
            const response = await fetchNotes();
            console.log(response.data);

            setLoading(true)
            if (response.success === true) {
                setLoading(false)
                setNotes(response.data!);
            }
        } catch (error) {
            setLoading(false)
            setAlertTitle("Error")
            setAlertText("Something went wrong")
            setAlertType("error")
            setAlert(true)
            console.error("Something went wrong fetching notes", error);
        }
    };

    const saveNote = async (title: string, content: string) => {
        const userEmail = Cookies.get("UserEmail")
        if (!userEmail) {
            console.error("User email not found in cookies");
            return;
        }
        const response = await addNote(title, content, userEmail);
        setLoading(true)
        if (response.success === true) {
            setLoading(false)

            setAlertTitle("Sucess")
            setAlertText(response.message!)
            setAlertType("sucess")
            setAlert(true)

            console.log(response.message)
            fetchNotesData();
        }
        else {
            setLoading(false)
            setAlertTitle("Error")
            setAlertText(response.error!)
            setAlertType("error")
            setAlert(true)
        }
    };

    const handledeleteNote = async (id: string) => {
        const response = await deleteNote(id)
        setLoading(true)
        if (response.success === true) {
            setLoading(false)

            setAlertTitle("Sucess")
            setAlertText(response.message!)
            setAlertType("sucess")
            setAlert(true)

            console.log(response.message)
            fetchNotesData();
        }
        else {
            setLoading(false)
            setAlertTitle("Error")
            setAlertText(response.error!)
            setAlertType("error")
            setAlert(true)
        }
    }

    const handleUpdateNote = async (id: string, title: string, content: string) => {
        const response = await updateNote(id, title, content)
        setLoading(true)
        if (response.success === true) {
            setLoading(false)

            setAlertTitle("Sucess")
            setAlertText(response.message!)
            setAlertType("sucess")
            setAlert(true)

            console.log(response.message)
            fetchNotesData();
        }
        else {
            setLoading(false)
            setAlertTitle("Error")
            setAlertText(response.error!)
            setAlertType("error")
            setAlert(true)
        }
    }

    useEffect(() => {
        fetchNotesData();
    }, [])

    const handleDragStart = (e: DragEvent<HTMLLIElement>, index: number) => {
        e.dataTransfer.setData("draggedIndex", String(index));
    };

    const handleDrop = (e: DragEvent<HTMLLIElement>, targetIndex: number) => {

        const draggedIndex = e.dataTransfer.getData("draggedIndex");
        const newItems = [...notes];

        const [draggedItem] = newItems.splice(Number(draggedIndex), 1);

        newItems.splice(targetIndex, 0, draggedItem);

        setNotes(newItems);
    };

    const handleDragOver = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    return (
        <div className={`flex justify-center flex-col gap-4 ${styles.container}`}>
            <div className="flex justify-center">
                <Note
                    title={""}
                    content={""}
                    editable={true}
                    style={{ width: "350px", height: "48px" }}
                    options={false}
                    onChange={async (updatedNote) =>
                        await saveNote(updatedNote.title, updatedNote.content)
                    }
                />
            </div>
            <ul
                className="flex justify-center grid grid-cols-4 gap-4 mt-10">
                {notes &&
                    notes.map((note, index) => (
                        <li key={note.id} draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}>
                            <Note
                                title={note.title}
                                content={note.content}
                                editable={true}
                                options={true}
                                onChange={async (updatedNote) => 
                                    await handleUpdateNote(note.id, updatedNote.title, updatedNote.content)
                                }
                                handleDelete={() => handledeleteNote(note.id)}
                            />
                        </li>
                    ))}
            </ul>
            {alert && <Alert type={alertType} title={alertTitle} text={alertText} Close={() => setAlert(false)} />}
        </div>
    );
}
export default MyNotes;