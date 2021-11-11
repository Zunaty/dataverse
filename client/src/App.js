import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

import Nav from './components/Nav';
import Footer from './components/Nav';
import Home from './components/Nav';
import Dashboard from './components/Nav';

function App() {
  return (
    <div>
      <header>
        <Nav></Nav>
      </header>

      <main>
        <Home>

        </Home>

        <Dashboard></Dashboard>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;