import React from "react";
import { Routes, Route } from "react-router-dom";
// import { ApolloProvider } from '@apollo/react-hooks';
// import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth';

// importing our components / pages
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   request: operation => {
//     const token = localStorage.getItem('id_token');
//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : ''
//       }
//     });
//   },
//   uri: '/graphql'
// });

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

function App() {

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  )
};

export default App;