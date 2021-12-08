import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import mainPageImage from '../../assets/images/DataVerseMainPage2.png';

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
        <Button href="/login" variant="contained" sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1}}>
          {"Login"}
        </Button>
        <Button href="/signup" variant="contained">
          {"Don't have an account? Sign Up"}
        </Button>
      </Grid>
    </div >
  );
};

export default Home;