import * as React from 'react';
import { Menu, MenuItem } from '@mui/material';

interface ContextMenuProps {
  contextMenu: { mouseX: number; mouseY: number} | null;
  onClose: () => void;
  onAddStickyNote: () => void;
  onAddDocument: () => void;
  onAddLink: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ contextMenu, onClose, onAddStickyNote, onAddDocument, onAddLink }) => {
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
        <MenuItem onClick={onAddStickyNote}>Add Sticky Note</MenuItem>
        <MenuItem onClick={onAddDocument}>Add Document</MenuItem>
        <MenuItem onClick={onAddLink}>Add Link</MenuItem>
    </Menu>
  );
};


