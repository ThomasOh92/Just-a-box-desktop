import * as React from 'react';
import { Box, IconButton, Link } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

interface WebLinkItemProps {
  id: string;
  link: string;
  linkName: string;
}

export const WebLinkItem: React.FC<WebLinkItemProps> = ({ id, link, linkName }) => {
  
  const handleLinkClick = () => {
    (window as any).electron.openExternalLink(link);
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
      <LinkIcon className="dragHandle" sx={{ fontSize: 20, paddingBottom: '5px' }} />
      <Link sx={{ fontSize: 12, textAlign: 'center'}} onClick={handleLinkClick} underline="hover" target="_blank">{linkName}</Link>
    </Box>
  );
};
