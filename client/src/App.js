import * as React from 'react';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import SignUp from './components/Signup';

function App() {
  return (<Router>
    <div>
      <header>
        <Nav></Nav>
      </header>
      <main> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path={"/signup"} element={<SignUp/>}/>
    </Routes>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>

    </Router>
  );
}

export default App;