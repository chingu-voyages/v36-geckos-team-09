import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
} from 'react-router-dom';

import './styles/app.scss';

import { Box, Container } from '@mui/material';

import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import About from './components/about/About';
import ManageCollections from './components/manage-collections/ManageCollections';
import AddFlashcard from './components/manage-collections/AddFlashcard';
import EditFlashcard from './components/manage-collections/EditFlashcard';
import Collection from './components/manage-collections/collection/Collection';

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
                            <Route
                                path='/manage-collections'
                                element={<ManageCollections />}
                            />
                            <Route
                                path='/collections/:collectionName'
                                element={<Collection />}
                            />
                            <Route
                                path='/manage-collections/add-flashcard'
                                element={<AddFlashcard />}
                            />
                            <Route
                                path='/manage-collections/edit-flashcard/:id'
                                element={<EditFlashcard />}
                            />
                        </Switch>
                    </Container>
                </Box>
            </Box>
        </Router>
    );
};


export default App;

