import app from '@/firebase/firebaseConfig';
import { ApiResponse } from '@/types/ApiResponse';
import { deleteDoc, doc, Firestore, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie';

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
  updateNote: (id: string, title: string, updatedContent: string) => Promise<ApiResponse<string>>;
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
      const userNotes = notes.filter(note => note.email === Cookies.get("UserEmail"));
      return {
        success: true,
        data: userNotes
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
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        email,
        title,
        content,
        createdAt: new Date(),
        updatedAt: null,
      });
      set((state) => ({
        notes: [...state.notes, { id: docRef.id, title, content, email }],
      }));

      console.log("Document written with ID: ", docRef.id);

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

  updateNote: async (id: string, updatedTitle: string, updatedContent: string) => {
    try {
      
      const noteRef = doc(db, "notes", id);
      await updateDoc(noteRef, { title: updatedTitle, content: updatedContent, updatedAt: new Date() });
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
      const noteRef = doc(collection(db, "notes"), id);

      await deleteDoc(noteRef);
      set((state) => ({
        notes: state.notes.filter(note => note.id !== id),
      }));

      return {
        success: true,
        message: "Note deleted sucessfully"
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