import Note from "@/components/Note";
import { useUserContext } from "@/contexts/UserInfoContextProvider";
import { INote, useNoteStore } from "@/stores/useNoteStore";
import { useEffect, useState } from "react";

const MyNotes = () => {
    const { userEmail } = useUserContext()
    const { addNote, fetchNotes } = useNoteStore();

    const [notes, setNotes] = useState<INote[]>([])

    const saveNote = async (title: string, content: string) => {
        const response = await addNote(title, content, userEmail);

        if (response.success === true) {
            console.log(response.message)
        }
        else {
            console.error(response.error)
        }
    };


    useEffect(() => {
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

        fetchNotesData();
    }, [])

    return (
        <div className="flex justify-center flex-col gap-4">
            <div className="flex justify-center mt-40">
                <Note
                    title={""}
                    content={""}
                    editable={true}
                    style={{ width: "300px", height: "48px" }}
                    options={false}
                    onChange={async (updatedNote) =>
                        await saveNote(updatedNote.title, updatedNote.content)
                    }
                />
            </div>
            <ul
                className="flex justify-center flex-wrap gap-4 mt-10"
                style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`
                }}
            >
                {notes &&
                    notes.map((note, index) => (
                        <li key={index}>
                            <Note
                                title={note.title}
                                content={note.content}
                                editable={true}
                                options={true}
                                onChange={async (updatedNote) =>
                                    await saveNote(updatedNote.title, updatedNote.content)
                                }
                            />
                        </li>
                    ))}
            </ul>
        </div>
    );
}
export default MyNotes;