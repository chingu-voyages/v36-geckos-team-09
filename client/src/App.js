import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
} from 'react-router-dom';

import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import About from './components/about/About';
import ManageCollections from './components/manage-collections/ManageCollections';
import Collection from './components/manage-collections/collection/Collection';
import Play from './components/play/Play';
import NotFound from './components/not-found/NotFound';

import './styles/app.scss';
import { Box, Container } from '@mui/material';

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
                            <Route path='/play' element={<Play />} />
                            <Route path='/about' element={<About />} />
                            <Route
                                path='/manage-collections'
                                element={<ManageCollections />}
                            />
                            <Route
                                path='/collections/:collectionName'
                                element={<Collection />}
                            />
                            <Route path='*' element={<NotFound />} />
                        </Switch>
                    </Container>
                </Box>
            </Box>
        </Router>
    );
};

export default App;
