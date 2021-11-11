import * as React from 'react';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

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