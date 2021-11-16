// This is based off the MUI provided template
// Sign in

import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

const theme = createTheme();

function Home()
{
  const [formState, setFormState] = useState({ password: '', email: '' });
  const [userLogin] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const handleSubmit = async event =>
  {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try
    {
      //if login works, mutation response is the token object.
      const mutationResponse = await userLogin({
        variables: {
          email: data.get('email'),
          password: data.get('password')
        }
      });
      console.log(mutationResponse);
      navigate("/dashboard");
    } catch (error)
    {
      console.log("Incorrect user name and/or password")
    }
  };

  const handleChange = event =>
  {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  



return (
  <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Sign In Title Text */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {/* Form box */}
        <Box component="form" onSubmit={handleSubmit} Validate sx={{ mt: 1 }}>

          {/* Email Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />

          {/* Password Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />

          {/* Remember Me Checkbox */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          {/* Submit button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          {/* container holding sign up link */}
          <Grid container>

            {/* Linking to Sign Up Page */}
            <Grid item>
              <ReactLink to="/signup">
                {"Don't have an account? Sign Up"}
              </ReactLink>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Container>
  </ThemeProvider>
)
};

export default Home;