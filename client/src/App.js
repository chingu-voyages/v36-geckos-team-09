/* <<<<<<< HEAD */
/* import React from 'react';
import { 
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link
} from 'react-router-dom' */
/* import './App.css'; */
/* import Collections from './components/Collections'
import AddFlashcard from './components/AddFlashcard'
import EditFlashcard from './components/EditFlashcard'

function App() {
  return (
    <Router>
      <nav>
        <button>
          <Link to="/"> Home </Link>
        </button> 
        <button>
          <Link to="/play"> Play </Link>
        </button>
        <button>
          <Link to="/about"> About Us </Link>
        </button>
        <button>
          <Link to="/collections"> Manage Collections </Link>
        </button>
      </nav>
      <Switch>
        <Route path="/" element={<h1>Home</h1>} /> 
        <Route path="/play" element={<h1>Play</h1>} />
        <Route path="/about" element={<h1>About Us</h1>} />
        <Route path="/collections" element={ <Collections />} />
        <Route path="/collections/add-flashcard" element={ <AddFlashcard />} />
        <Route path="/collections/edit-flashcard/:id" element={ <EditFlashcard />} />
      </Switch>
      
    </Router>
  );
} */

 import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from 'react-router-dom';

import './styles/app.scss';

import { Box, Container } from '@mui/material';

import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import About from './components/about/About';
import Collections from './components/Collections'
import AddFlashcard from './components/AddFlashcard'
import EditFlashcard from './components/EditFlashcard'

const App = () => {
    return (
        <Router>
            <Box
                className='app'
                display='flex'
                flexDirection='column'
                pt={10}
                pb={5}
            >
                <Box maxWidth='1000px' margin='0 auto'>
                    <Container>
                        <Navbar />
                        <Switch>
                            <Route path='/' element={<Home />} />
                            <Route path='/play' element={<h1>Play</h1>} />
                            <Route path='/about' element={<About />} />
                            <Route path="/collections" element={ <Collections />} />
                            <Route path="/collections/add-flashcard" element={ <AddFlashcard />} />
                            <Route path="/collections/edit-flashcard/:id" element={ <EditFlashcard />} />
                        </Switch>
                    </Container>
                </Box>
            </Box>
        </Router>
    );
};
/* >>>>>>> a8ba3ed65d8efec304874a11384e74f518620092 */

 export default App;
 