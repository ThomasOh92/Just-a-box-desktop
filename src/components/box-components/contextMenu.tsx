import * as React from 'react';
import { Menu, MenuItem } from '@mui/material';

interface ContextMenuProps {
  contextMenu: { mouseX: number; mouseY: number, id: string | undefined} | null;
  onClose: () => void;
  onAddStickyNote: () => void;
  onAddDocument: () => void;
  onAddLink: () => void;
  onDeleteItem: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ contextMenu, onClose, onAddStickyNote, onAddDocument, onAddLink, onDeleteItem }) => {
    return (
      <Menu
        open={contextMenu !== null}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {contextMenu?.id === undefined ? [
          <MenuItem key="add-sticky-note" onClick={onAddStickyNote}>Add Sticky Note</MenuItem>,
          <MenuItem key="add-document" onClick={onAddDocument}>Add Document</MenuItem>,
          <MenuItem key="add-link" onClick={onAddLink}>Add Link</MenuItem>
        ] : [
          <MenuItem key="delete-item" onClick={onDeleteItem}>Delete</MenuItem>
        ]}
      </Menu>
    );

};


