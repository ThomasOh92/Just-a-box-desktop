import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';


export const Dustbin = React.forwardRef<HTMLDivElement>((props, ref) => {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      }));

    return (
        <Item elevation={3}>
            <DeleteIcon sx={{ fontSize: 40, paddingBottom: '5px' }} />
        </Item>    
    );
  });
  
  