import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
} from 'react-router-dom';

import './styles/app.scss';

import { Box } from '@mui/material';

import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';

const App = () => {
    return (
        <Router>
            <Box className='app'>
                <Navbar />
                <Box maxWidth='1000px' margin='0 auto'>
                    <Switch>
                        <Route path='/' element={<Home />} />
                        <Route path='/play' element={<h1>Play</h1>} />
                        <Route path='/about' element={<h1>About Us</h1>} />
                        <Route
                            path='/collections'
                            element={<h1>Manage Collections</h1>}
                        />
                    </Switch>
                </Box>
            </Box>
        </Router>
    );
};

export default App;
