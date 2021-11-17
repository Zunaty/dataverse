import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from '@apollo/client';
import mainPageImage from '../../images/DataVerseMainPage2.png'
import { height } from '@mui/system';

const theme = createTheme();

function Home()
{
  const navigate = useNavigate();

  const goToLogin = async event => {
    event.preventDefault();
    navigate("/login");
  }

  
  return (
    <div style={{
      backgroundImage: `url(${mainPageImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '777px',
      marginTop: '25px'
    }}>
      <Grid container
        height='777px'
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <ThemeProvider theme={theme}>
          <Container maxWidth="xs">
          <Container sx={{ ml: 18.5, mb: 5}}>
              <ReactLink to="/login">
                {"Sign In"}
              </ReactLink>
            </Container>
            <Container sx={{ ml: 7.5 }}>
              <ReactLink to="/signup">
                {"Don't have an account? Sign Up"}
              </ReactLink>
            </Container>
          </Container>
        </ThemeProvider>
      </Grid>
    </div >
  );
};

export default Home;