import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StickyNote {
  id: string; // A unique identifier for each sticky note
  content: string;
}

interface StickyNotesState {
  stickyNotesArray: StickyNote[];
}

const initialState: StickyNotesState = {
  stickyNotesArray: [
    {id: "note1", content: "content for note 1"}
  ],
};

export const stickyNotesSlice = createSlice({
  name: 'stickyNotes',
  initialState,
  reducers: {
    addToStickyNoteState: (state, action: PayloadAction<{newNoteId: string}>) => {
      const { newNoteId } = action.payload;
      const newNote = {
        id: newNoteId,
        content: "content for note " + newNoteId,
      };
      state.stickyNotesArray.push(newNote);
    },
    removeFromStickyNoteState: (state, action: PayloadAction<string>) => {
      state.stickyNotesArray = state.stickyNotesArray.filter(note => note.id !== action.payload);
    },
    updateStickyNoteContent: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const { id, content } = action.payload;
      const note = state.stickyNotesArray.find(note => note.id === id);
      if (note) {
        note.content = content;
      }    
    },
    // resizeStickyNote: (state, action: PayloadAction<{ id: string; width: number; height: number }>) => {
    //     const { id, width, height } = action.payload;
    //     const note = state.stickyNotesArray.find(note => note.id === id);
    //     if (note) {
    //       note.width = width;
    //       note.height = height;
    //     }
    //   }, 
    // moveStickyNote: (state, action: PayloadAction<{ id: string; x: number; y: number }>) => {
    //   const { id, x, y } = action.payload;
    //   const note = state.stickyNotesArray.find(note => note.id === id);
    //   if (note) {
    //     note.x = x;
    //     note.y = y;
    //   }
    // },  
  },
});

export const { addToStickyNoteState, removeFromStickyNoteState, updateStickyNoteContent } = stickyNotesSlice.actions;

export default stickyNotesSlice.reducer;
