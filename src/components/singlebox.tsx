import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Layout } from "react-grid-layout";
import GridLayout from 'react-grid-layout';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { StickyNoteItem } from './box-components/stickyNote';
import { ContextMenu } from './box-components/contextMenu';
import { addToStickyNoteState,  removeFromStickyNoteState } from '../app/features/stickyNoteSlice';
import { addToWebLinkState, removeFromWebLinkState } from '../app/features/webLinkSlice';
import { AddItemModal } from './box-components/addItemModal';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { WebLinkItem } from './box-components/webLink';
import { FileLinkItem } from './box-components/fileLink';
import { addToFileLinkState, removeFromFileLinkState } from '../app/features/fileLinkSlice';

const SingleBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const [layout, setLayout] = useState<Layout[]>([]);

  useEffect(() => {
    (async () => {
      try {
        // Fetch the whole initial store
        const wholeStore = await (window as any).electron.getWholeStore();
        await dispatch(addToStickyNoteState(wholeStore.initialNotes[0]));
        await dispatch(addToWebLinkState(wholeStore.initialLinks[0]));
        await dispatch(addToFileLinkState(wholeStore.initialFiles[0]));
        setLayout(wholeStore.initialLayout);
      } catch (error) {
        console.error('Failed to fetch data from Electron store:', error);
      }
    })();
  }, []);  
  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };
  useEffect(() => {
    console.log(layout, "new layout");
  }, [layout]);

  const deleteItem = () => {
    console.log(contextMenu?.id, "delete item with id");
    if (contextMenu?.id?.startsWith("note")) {
      dispatch(removeFromStickyNoteState(contextMenu.id));
      console.log('deleting note')
    }
    if (contextMenu?.id?.startsWith("link")) {
      dispatch(removeFromWebLinkState(contextMenu.id));
      console.log('deleting link')
    }
    if (contextMenu?.id?.startsWith("file")) {
      dispatch(removeFromFileLinkState(contextMenu.id));
      console.log('deleting file')
    }
    setLayout(prevLayout => prevLayout.filter(item => item.i !== contextMenu?.id));
    setContextMenu(null); // Close the context menu after deletion
  }

  //Right Clicks
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    id: string | undefined;
  } | null>(null);
  
  const handleRightClickGeneric = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY + 4,
      id: undefined});
  };

  const handleRightClickElement =  (event: React.MouseEvent, id?: string) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY + 4,
      id: id
    });
  }

  //Sticky Note Management
  const stickyNotes = useAppSelector(state => state.stickyNotes.stickyNotesArray)
  const stickyNotesToRender = stickyNotes.map((note: { id: string, content: string }) => {
    return (
      <div key={note.id} onContextMenu={(e) => handleRightClickElement(e, note.id)}>
        <StickyNoteItem
          id={note.id}
          content={note.content}
        />
      </div>
    );
  })
  const addStickyNote = () => {
    const newNoteId = "note" + Math.random().toString(36).substring(7) // Random ID
    dispatch(addToStickyNoteState({ id: newNoteId, content: `New Note ${newNoteId}`}));
    setLayout([...layout, { i: newNoteId, x: 0, y: 0, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]}])
  }

  //Weblink Management
  const weblinks = useAppSelector(state => state.webLinks.weblinksArray)
  const weblinksToRender = weblinks.map((weblink: { id: string, linkName: string, url: string }) => {
    return (
      <div key={weblink.id} onContextMenu={(e) => handleRightClickElement(e, weblink.id)}>
        <WebLinkItem
          id={weblink.id}
          link={weblink.url}
          linkName={weblink.linkName}
        />
      </div>
    );
  })
  const [weblinkModal, setWeblinkModal] = useState<boolean>(false);
  const addWeblink = (inputValue: string) => {
    const newWebLinkId = "link" + Math.random().toString(36).substring(7) // Random ID
    dispatch(addToWebLinkState({id: newWebLinkId, linkName: inputValue, url: inputValue}));
    setLayout([...layout, { i: newWebLinkId, x: 0, y: 0,  w: 1, h: 2, isResizable: false}])
  };

  //File Management
  const filelinks = useAppSelector(state => state.fileLinks.fileLinksArray)
  const filelinksToRender = filelinks.map((filelink: { id: string, fileName: string, filePath: string }) => {
    return (
      <div key={filelink.id} onContextMenu={(e) => handleRightClickElement(e, filelink.id)}>
        <FileLinkItem
          id={filelink.id}
          fileName={filelink.fileName}
          filePath={filelink.filePath}
        /> 
      </div>
    );
  })
  const [filelinkModal, setFilelinkModal] = useState<boolean>(false);
  const addFilelink = (inputValue: string) => {
    const newFileLinkId = "file" + Math.random().toString(36).substring(7) // Random ID
    const lastIndex = inputValue.lastIndexOf("\\");
    const submittedFileName = inputValue.substring(lastIndex + 1);
    console.log(submittedFileName, "submittedFileName")
    dispatch(addToFileLinkState({id: newFileLinkId, fileName: submittedFileName, filePath: inputValue}));
    setLayout([...layout, { i: newFileLinkId, x: 0, y: 0,  w: 1, h: 2, isResizable: false}])
  };

  // Render begins here
  return (
    <Box className="box" onContextMenu={handleRightClickGeneric} height={525} width={750} id="box" style={{overflow: 'hidden'}}>
      <ContextMenu 
        contextMenu={contextMenu} 
        onClose={() => setContextMenu(null)} 
        onAddStickyNote={() => {
          addStickyNote()
          setContextMenu(null)
        }}
        onAddDocument={() => {
          setFilelinkModal(true) 
          setContextMenu(null)
        }} 
        onAddLink={() => {
          setWeblinkModal(true) 
          setContextMenu(null)
        }} 
        onDeleteItem={deleteItem} 
        />
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        compactType={null}
        onLayoutChange={onLayoutChange}
        rowHeight={20}
        isResizable={true}
        preventCollision={true}
        isDraggable={true}
        maxRows={17}
        width={750}
        draggableHandle='.dragHandle'
        style={{overflow: 'hidden'}}
      > 
        {stickyNotesToRender}
        {weblinksToRender}
        {filelinksToRender}
        {/* Test Element */}
        <div key="test" className="dragHandle" style={{border: '1px solid black' }}></div>
      </GridLayout>
      <AddItemModal open={weblinkModal} onClose={() => setWeblinkModal(false)} onAdd={addWeblink} label="Add URL Here"/>
      <AddItemModal open={filelinkModal} onClose={() => setFilelinkModal(false)} onAdd={addFilelink} label="Add File Path Here"/>
    </Box>
  );
  
};

export default SingleBox;


