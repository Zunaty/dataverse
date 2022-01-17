// Importing React
import React from 'react';

// Importing MUI theme styling
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Importing utils
import { Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth';

// importing our components / pages
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';



// Connecting to server
const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const loggedIn = Auth.loggedIn();



// MUI Theme
const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#455a64',
        },
        secondary: {
            main: '#0097a7',
        },
        success: {
            main: '#FFCDB2',
        },
        info: {
            main: '#4d7298',
        },
    },
    // typography: {
    //     fontFamily: 'Roboto',
    // },
});



export default function App() {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div>
                    <header>
                        <Nav />
                    </header>

                    <main>
                        {loggedIn ? (
                            <>
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route element="404 Page Not Found" />
                                </Routes>
                            </>
                        ) : (
                            <>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<Signup />} />
                                    <Route element="404 Page Not Found" />
                                </Routes>
                            </>
                        )}
                    </main>

                    <footer>
                        <Footer />
                    </footer>
                </div>
            </ThemeProvider>
        </ApolloProvider>
    )
};