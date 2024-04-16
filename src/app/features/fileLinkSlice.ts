import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileLink {
  id: string; // A unique identifier for each file
  fileName: string;
  filePath: string;
}

interface FileLinksState {
  fileLinks: FileLink[];
}

const initialState: FileLinksState = {
  fileLinks: [],
};

export const fileLinksSlice = createSlice({
  name: 'fileLinks',
  initialState,
  reducers: {
    addFileLink: (state, action: PayloadAction<FileLink>) => {
      state.fileLinks.push(action.payload);
    },
    removeFileLink: (state, action: PayloadAction<string>) => {
      state.fileLinks = state.fileLinks.filter(file => file.id !== action.payload);
    },
    // You can add more reducers as needed, for example, to update a file's details
    updateFileLink: (state, action: PayloadAction<{id: string, fileName?: string, filePath?: string}>) => {
      const index = state.fileLinks.findIndex(file => file.id === action.payload.id);
      if(index !== -1) {
        const file = state.fileLinks[index];
        if(action.payload.fileName) file.fileName = action.payload.fileName;
        if(action.payload.filePath) file.filePath = action.payload.filePath;
      }
    },
  },
});

export const { addFileLink, removeFileLink, updateFileLink } = fileLinksSlice.actions;

export default fileLinksSlice.reducer;
