import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebLink {
  id: string; // A unique identifier for each weblink
  linkName: string;
  url: string;
}

interface WebLinksState {
  weblinksArray: WebLink[];
}

const initialState: WebLinksState = {
  weblinksArray: [
    {id: "link1", linkName: "GoogleTest", url: "https://www.google.com"},
  ],
};

export const webLinksSlice = createSlice({
  name: 'webLinks',
  initialState,
  reducers: {
    addWebLink: (state, action: PayloadAction<WebLink>) => {
      state.weblinksArray.push(action.payload);
    },
    removeWebLink: (state, action: PayloadAction<string>) => {
      state.weblinksArray = state.weblinksArray.filter(weblink => weblink.id !== action.payload);
    },
    // You can add more reducers as needed, for example, to update a weblink's details
    updateWebLink: (state, action: PayloadAction<{id: string, linkName?: string, url?: string}>) => {
      const index = state.weblinksArray.findIndex(weblink => weblink.id === action.payload.id);
      if(index !== -1) {
        const weblink = state.weblinksArray[index];
        if(action.payload.linkName) weblink.linkName = action.payload.linkName;
        if(action.payload.url) weblink.url = action.payload.url;
      }
    },
  },
});

export const { addWebLink, removeWebLink, updateWebLink } = webLinksSlice.actions;

export default webLinksSlice.reducer;
