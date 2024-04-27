import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileLink {
  id: string; // A unique identifier for each file
  fileName: string;
  filePath: string;
}

interface FileLinksState {
  fileLinksArray: FileLink[];
}

const initialState: FileLinksState = {
  fileLinksArray: [],
};

export const fileLinksSlice = createSlice({
  name: 'fileLinks',
  initialState,
  reducers: {
    initializeFileLinksState: (state, action: PayloadAction<FileLink[]>) => {
      state.fileLinksArray = action.payload;
    },
    addToFileLinkState: (state, action: PayloadAction<FileLink>) => {
      state.fileLinksArray.push(action.payload);
    },
    removeFromFileLinkState: (state, action: PayloadAction<string>) => {
      state.fileLinksArray = state.fileLinksArray.filter(file => file.id !== action.payload);
    },
    // You can add more reducers as needed, for example, to update a file's details
    // updateFileLink: (state, action: PayloadAction<{id: string, fileName?: string, filePath?: string}>) => {
    //   const index = state.fileLinksArray.findIndex(file => file.id === action.payload.id);
    //   if(index !== -1) {
    //     const file = state.fileLinksArray[index];
    //     if(action.payload.fileName) file.fileName = action.payload.fileName;
    //     if(action.payload.filePath) file.filePath = action.payload.filePath;
    //   }
    // },
  },
});

export const { initializeFileLinksState, addToFileLinkState, removeFromFileLinkState } = fileLinksSlice.actions;

export default fileLinksSlice.reducer;
