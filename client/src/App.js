import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
} from 'react-router-dom';

import './styles/app.scss';

import { Box } from '@mui/material';

import Home from './components/home/Home';

const App = () => {
    return (
        <Router>
            <Box className='app'>
                <nav>
                    <button>
                        <Link to='/'> Home </Link>
                    </button>
                    <button>
                        <Link to='/play'> Play </Link>
                    </button>
                    <button>
                        <Link to='/about'> About Us </Link>
                    </button>
                    <button>
                        <Link to='/collections'> Manage Collections </Link>
                    </button>
                </nav>
                <Box border={1} maxWidth='1000px' margin='0 auto'>
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
