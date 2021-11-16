import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as ReactLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const theme = createTheme();

function Signup(props)
{
  const [formState, setFormState] = useState({ username: '', password: '', email: '' });
  const [addUser] = useMutation(ADD_USER);

  // Submit button is pressed and data is sent to the server
  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const mutationResponse = await addUser({
        variables: {
          username: data.get('userName'),
          password: data.get('password'),
          email: data.get('email')
        }
      });

      const token = mutationResponse.data.addUser.token;
      Auth.login(token);

    } catch (error) {
      console.log(error);
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
          {/* Sign Up title */}
          <Typography component="h1" variant="h5">
            Sign-up
          </Typography>

          {/* Sign Up Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              {/* Username Field */}
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="Name"
                  label="Username"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>

              {/* Email Field */}
              <Grid item xs={12}>
                <TextField
                  required
                  error={false}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={handleChange}
                />
              </Grid>

              {/* Password Field */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Grid container>
              <Grid item>

                {/* Link to login */}
                <ReactLink to="/login">
                  Already have an account? Sign in
                </ReactLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;