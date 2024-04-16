import * as React from 'react';
import { Box, IconButton, Link } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

interface WebLinkItemProps {
  id: string;
  link: string;
  onDelete: (id: string) => void;
  showDelete: boolean;
}

export const WebLinkItem: React.FC<WebLinkItemProps> = ({ id, link, onDelete, showDelete }) => {
  return (
    <Box
      className="dragHandle"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': { border: '1px dotted', borderColor: 'primary.dark', borderRadius: '5px' },
      }}
    >
      <LinkIcon sx={{ fontSize: 40, paddingBottom: '5px' }} />
      <Link sx={{ fontSize: 12, textAlign: 'center' }} href={link} underline="hover" target="_blank">{link}</Link>
    </Box>
  );
};
