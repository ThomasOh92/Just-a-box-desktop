import * as React from 'react';
import { Box, Link } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

interface FileLinkItemProps {
  id: string;
  fileName: string;
  filePath: string;
}

export const FileLinkItem: React.FC<FileLinkItemProps> = ({ id, fileName, filePath }) => {
  
  const handleLinkClick = () => {
    console.log("Opening file: ", filePath);
    (window as any).electron.openFile(filePath);
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': { border: '1px dotted', borderColor: 'primary.dark', borderRadius: '5px' },
      }}
    >
      <DescriptionIcon className="dragHandle" sx={{ fontSize: 20, paddingBottom: '5px' }} />
      <Link sx={{ fontSize: 12, textAlign: 'center'}} onClick={handleLinkClick} underline="hover" target="_blank">{fileName}</Link>
    </Box>
  );
};
