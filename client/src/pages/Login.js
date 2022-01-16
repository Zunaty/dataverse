// Importing React
import * as React from 'react';
import { useState } from 'react';

// Importing MUI Components and Styling
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    Link
} from '@mui/material';
import { red } from '@mui/material/colors';

// Importing Utils
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const errorColor = red[500];

function Login() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [userLogin, { error }] = useMutation(LOGIN_USER);

    // Submit button pressed
    const handleSubmit = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            const mutationResponse = await userLogin({
                variables: {
                    email: data.get('email').toLowerCase(),
                    password: data.get('password')
                }
            })
            const token = mutationResponse.data.login.token;
            Auth.login(token);

        } catch (error) {
            console.log(error);
        }

        // Reseting form to be blank
        setFormState({
            email: '',
            password: ''
        });
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                {/* Sign In Title Text */}
                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                {/* Error popup */}
                <Box>
                    <Typography color={errorColor}>
                        {error && <div>Login failed</div>}
                    </Typography>
                </Box>

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
                        value={formState.email}
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
                        value={formState.password}
                        onChange={handleChange}
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
                            <Link href="/signup">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </Container>
    )
};

export default Login;