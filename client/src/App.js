import { 
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link
} from 'react-router-dom'
import './App.css';

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
        <Route path="/collections" element={<h1>Manage Collections</h1>} />
      </Switch>
      
    </Router>
  );
}

export default App;
