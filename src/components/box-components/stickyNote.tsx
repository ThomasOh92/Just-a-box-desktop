import * as React from 'react';
import { Card, CardHeader, Input } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateStickyNoteContent, removeFromStickyNoteState } from '../../app/features/stickyNoteSlice';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useState, useEffect } from 'react';


interface StickyNoteItemProps {
  id: string;
  content: string;
}

export const StickyNoteItem = React.forwardRef<HTMLDivElement, StickyNoteItemProps>(({ id, content}, ref) => {
  const [localContent, setLocalContent] = useState(content);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateStickyNoteContent({id, content: localContent}));
    }, 1000); // Update Redux store after 1 second of inactivity

    return () => clearTimeout(timer); // Clear the timer if the user starts typing again
  }, [localContent, dispatch, id]);


  // Update content of a sticky note
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalContent(e.target.value);
  };

  return (
    <Card
      className="stickyNote"
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '&:hover': { border: '1px dotted', borderColor: 'primary.dark', borderRadius: '5px' },
        width: '100%',
        height: '100%',
      }}

    >
      <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200', padding: '11px' }} />
        <textarea  
          rows={6} 
          placeholder={"Enter your text here..."}
          onChange={handleContentChange}
          onBlur={() => dispatch(updateStickyNoteContent({id, content: localContent}))} 
          style={{ width: '100%', height:'100%', border: '15px', padding: '7px',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '7',
            outline: 'none',
            resize: 'none'}}
          value={localContent}
        />
     </Card>
  );
});


//These components assume you have actions like deleteDocLink, deleteWebLink,
// updateStickyNote, etc., defined in your Redux slices. 
// Use useDispatch within each component to dispatch these actions, and
// useSelector to access any needed state from Redux.

