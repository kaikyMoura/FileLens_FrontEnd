import app from '@/firebase/firebaseConfig';
import { ApiResponse } from '@/types/ApiResponse';
import { deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid'

export interface INote {
  id: string;
  title: string;
  content: string;
  email: string;
}

interface NoteStore {
  notes: INote[];
  addNote: (title: string, content: string, email: string) => Promise<ApiResponse<string>>;
  fetchNotes: () => Promise<ApiResponse<INote[]>>;
  updateNote: (id: string, updatedContent: string) => Promise<ApiResponse<string>>;
  deleteNote: (id: string) => Promise<ApiResponse<string>>;
}

const db = getFirestore(app);

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  fetchNotes: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notes: INote[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<INote, 'id'>),
      }));
      set({ notes });
      return {
        success: true,
        data: notes
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message) {
          return {
            success: false,
            error: err.message
          };
        }
      }
    }
    return {
      error: "Internal server error"
    }
  },

  addNote: async (title, content, email) => {
    const id = uuidv4()
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        id,
        title,
        content,
        createdAt: new Date(),
      });
      set((state) => ({
        notes: [...state.notes, { id: docRef.id, title, content, email }],
      }));

      await useNoteStore.getState().fetchNotes(); // Fetch notes after adding note

      return {
        success: true,
        message: "Note created sucessfully"
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message) {
          return {
            success: false,
            error: err.message
          };
        }
      }
    }
    return {
      error: "Internal server error"
    }
  },

  updateNote: async (id: string, updatedContent: string) => {
    try {
      const noteRef = doc(db, "notes", id);
      await updateDoc(noteRef, { content: updatedContent });
      set((state) => ({
        notes: state.notes.map(note =>
          note.id === id ? { ...note, content: updatedContent } : note
        ),
      }));
      return {
        success: true,
        message: "Note updated sucessfully"
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message) {
          return {
            success: false,
            error: err.message
          };
        }
      }
    }
    return {
      error: "Internal server error"
    }
  },

  deleteNote: async (id: string) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      set((state) => ({
        notes: state.notes.filter(note => note.id !== id),
      }));

      return {
        success: true,
        message: "Note deletd sucessfully"
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message) {
          return {
            success: false,
            error: err.message
          };
        }
      }
    }
    return {
      error: "Internal server error"
    }
  },
}));