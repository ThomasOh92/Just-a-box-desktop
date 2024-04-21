import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Layout } from "react-grid-layout";
import GridLayout from 'react-grid-layout';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { StickyNoteItem } from './box-components/stickyNote';
import { ContextMenu } from './box-components/contextMenu';
import { addToStickyNoteState,  removeFromStickyNoteState } from '../app/features/stickyNoteSlice';
import { AddItemModal } from './box-components/addItemModal';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const SingleBox: React.FC = () => {
  const dispatch = useAppDispatch();

  //Layout Management
  const [layout, setLayout] = useState<Layout[]>(
      [
        { i: "note1", x: 2, y: 2, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]},
        { i: "test", x: 0, y: 0, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]},
        { i: "dustbin", x: 13, y: 14, w: 1, h: 2, static: true },
      ],
    );
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
  
  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY + 4,
      id: undefined});
  };

  //Sticky Note Management
  const stickyNotes = useAppSelector(state => state.stickyNotes.stickyNotesArray)
  const stickyNotesToRender = stickyNotes.map((note: { id: string, content: string }) => {
    return (
      <div key={note.id} onContextMenu={(e) => handleStickyNoteRightClick(e, note.id)}>
        <StickyNoteItem
          id={note.id}
          content={note.content}
        />
      </div>
    );
  })
  const addStickyNote = () => {
    const newNoteId = "note" + Math.random().toString(36).substring(7) // Random ID
    dispatch(addToStickyNoteState({ newNoteId }));
    setLayout([...layout, { i: newNoteId, x: 0, y: 0, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]}])
  }
  const handleStickyNoteRightClick = (event: React.MouseEvent, id?: string) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY + 4,
      id: id
    });
  };


  //Weblink Management
  const [weblinkModal, setWeblinkModal] = useState<boolean>(false);
  const addWeblink = () => {
    console.log("addweblinkplaceholder");
  };
  const handleWeblinkRightClick = (event: React.MouseEvent) => (event: React.MouseEvent, id?: string) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY + 4,
      id: id
    });
  };


  // Render begins here
  return (
    <Box className="box" onContextMenu={handleRightClick} height={525} width={750} id="box" style={{overflow: 'hidden'}}>
      <ContextMenu 
        contextMenu={contextMenu} 
        onClose={() => setContextMenu(null)} 
        onAddStickyNote={() => addStickyNote()} 
        onAddDocument={() => {
          setWeblinkModal(true) 
          setContextMenu(null)
        }} 
        onAddLink={() => console.log("addlinkplaceholder")}
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
        {/* Sticky Note Elements */}
        {stickyNotesToRender}
        {/* Weblink Elements */}

        {/* Document Elements */}

        {/* Test Element */}
        <div key="test" className="dragHandle" style={{border: '1px solid black' }}></div>
      </GridLayout>
      <AddItemModal open={weblinkModal} onClose={() => setWeblinkModal(false)} onAdd={addWeblink} label="Add URL Here"/>
    </Box>
  );
  
};

export default SingleBox;


