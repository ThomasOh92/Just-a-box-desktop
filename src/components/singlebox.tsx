import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Layout } from "react-grid-layout";
import GridLayout from 'react-grid-layout';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { StickyNoteItem } from './box-components/stickyNote';
import { ContextMenu } from './box-components/contextMenu';
import { Dustbin } from './box-components/dustbin';
import { addToStickyNoteState,  removeFromStickyNoteState } from '../app/features/stickyNoteSlice';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";


const SingleBox: React.FC = () => {
  const dispatch = useAppDispatch();

  //Layout Management
  const [layout, setLayout] = useState<Layout[]>(
      [
        { i: "note1", x: 2, y: 2, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]},
        { i: "test", x: 0, y: 0, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]},
        { i: "dustbin", x: 12, y: 14, w: 1, h: 2, static: true },
      ],
    );

    const onLayoutChange = (newLayout: any) => {
      setLayout(newLayout);
    };

    useEffect(() => {
      console.log(layout, "new layout");
    }, [layout]);

  //Right Clicks
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  
  const handleRightClick = (event: React.MouseEvent, id?: string) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY + 4,
    });
  };
  

  //Sticky Note Management
  const stickyNotes = useAppSelector(state => state.stickyNotes.stickyNotesArray)
  const stickyNotesToRender = stickyNotes.map((note: { id: string, content: string }) => {
    return (
      <div key={note.id}>
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

  // Render begins here
  return (
    <Box onContextMenu={handleRightClick} height={500} width={700} id="box" style={{border: 'grey 1px solid'}}>
      <ContextMenu 
        contextMenu={contextMenu} 
        onClose={() => setContextMenu(null)} 
        onAddStickyNote={() => addStickyNote()} 
        onAddDocument={() => console.log("adddocplaceholder")} 
        onAddLink={() => console.log("addlinkplaceholder")}
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
        width={700}
        draggableHandle='.dragHandle'
      > 
        {/* Sticky Note Elements */}
        {stickyNotesToRender}

        <div key="test" className="dragHandle" style={{border: '1px solid black' }}></div>
        <div key="dustbin"><Dustbin/></div>
      </GridLayout>

    </Box>
  );
  
};

export default SingleBox;


