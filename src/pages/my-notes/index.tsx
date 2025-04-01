import Note from "@/components/Note";
import { INote, useNoteStore } from "@/stores/useNoteStore";
import Cookies from "js-cookie";
import { DragEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss"

const MyNotes = () => {

    const { addNote, deleteNote, fetchNotes } = useNoteStore();

    const [notes, setNotes] = useState<INote[]>([])

    const fetchNotesData = async () => {
        try {
            const response = await fetchNotes();
            console.log(response.data);
            if (response.success === true) {
                setNotes(response.data!);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const saveNote = async (title: string, content: string) => {
        const userEmail = Cookies.get("UserEmail")
        if (!userEmail) {
            console.error("User email not found in cookies");
            return;
        }
        const response = await addNote(title, content, userEmail);

        if (response.success === true) {
            console.log(response.message)
            fetchNotesData();

        }
        else {
            console.error(response.error)
        }
    };

    const handledeleteNote = async (id: string) => {
        const response = await deleteNote(id)

        if (response.success === true) {
            console.log(response.message)
            fetchNotesData();
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
        // Impedir o comportamento padrão para permitir o drop
        e.preventDefault();
    };

    return (
        <div className={`flex justify-center flex-col gap-4 ${styles.container}`}>
            <div className="flex justify-center">
                <Note
                    title={"add a note..."}
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
                className="flex justify-center flex-wrap gap-4 mt-10">
                {notes &&
                    notes.map((note, index) => (
                        <li key={index} draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}>
                            <Note
                                title={note.title}
                                content={note.content}
                                editable={true}
                                options={true}
                                onChange={async (updatedNote) =>
                                    await saveNote(updatedNote.title, updatedNote.content)
                                }
                                handleDelete={() => handledeleteNote(note.id)}
                            />
                        </li>
                    ))}
            </ul>
        </div>
    );
}
export default MyNotes;