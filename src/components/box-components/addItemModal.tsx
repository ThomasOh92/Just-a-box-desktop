import * as React from 'react';
import { Box, Button, TextField, Modal } from '@mui/material';

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (value: string) => void;
  label: string;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ open, onClose, onAdd, label }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleAdd = () => {
    onAdd(inputValue);
    setInputValue('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ /* Your styles here */ }}>
        <TextField
          id="add-item-input"
          label={label}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
        />
        <Button onClick={handleAdd}>Add</Button>
      </Box>
    </Modal>
  );
};


//const dispatch = useDispatch();

// const handleAddDocument = (value: string) => {
//     dispatch(addDocLinkAction({ id: generateId(), fileName: value, filePath: value }));
//   };
  