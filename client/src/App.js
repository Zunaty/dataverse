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

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
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
              <Route path="/signup" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route element="404 Page Not Found" />
            </Routes>
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      
    </ApolloProvider>
  );
}

export default App;