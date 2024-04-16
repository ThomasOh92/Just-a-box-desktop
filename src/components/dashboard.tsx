import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
  },
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const handleItemClick = (index: number) => {
  (window as any).electron.send('open-single-box', index);
};

const Dashboard: React.FC = () => {

  
  // Render begins here
  return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ThemeProvider theme={lightTheme}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                <Item key={index} elevation={6} onClick={() => handleItemClick(index)}>
                  {`box ${index}`}
                </Item>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      </Grid>

  );
  
};

export default Dashboard;
