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
                                path='/collections'
                                element={<h1>Manage Collections</h1>}
                            />
                        </Switch>
                    </Container>
                </Box>
            </Box>
        </Router>
    );
};

export default App;
