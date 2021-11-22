import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import mainPageImage from '../../assets/images/DataVerseMainPage2.png'

const theme = createTheme();

function Home() {

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
          <Container sx={{ ml: 0, mb: 5}}>
              <Button href="/login" variant="contained">
                {"Login"}
              </Button>
            </Container>
            <Container sx={{ ml: 0 }}>
              <Button href="/signup" variant="contained">
                {"Don't have an account? Sign Up"}
              </Button>
            </Container>
          </Container>
        </ThemeProvider>
      </Grid>
    </div >
  );
};

export default Home;