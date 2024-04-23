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
  
  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
  };

  const handleAdd = () => {
    onAdd(inputValue);
    console.log("addedweblinkplaceholder");
    setInputValue('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <TextField
          id="add-item-input"
          label={label}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
        />
          <Button sx={{ top: '5px', width: '30px' }} variant="contained" onClick={handleAdd}>Add</Button>
      </Box>
    </Modal>
  );
};


//const dispatch = useDispatch();

// const handleAddDocument = (value: string) => {
//     dispatch(addDocLinkAction({ id: generateId(), fileName: value, filePath: value }));
//   };
  