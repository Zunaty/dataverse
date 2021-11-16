import React from "react";
import { Routes, Route } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from "@apollo/client";

// importing our components
import Nav from './components/Nav';
import Footer from './components/Footer';
// Home is the Login Form
import Home from './components/Home';
// import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  request: operation => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
});

function App() {
 
  return (
    <ApolloProvider client={client}>
      
        <div>
          <header>
            <Nav />
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route element="404 Page Not Found" />
            </Routes>
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      
    </ApolloProvider>
  )
  //);
}

export default App;