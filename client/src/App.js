import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import RegisterOne from './components/RegisterOne/RegisterOne';
import RegisterTwo from './components/RegisterTwo/RegisterTwo';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/" component={NavBar} />
      <Route exact path="/asociados" component={RegisterOne} />
      <Route exact path="/asociados/register" component={RegisterTwo} />
    </div>
  );
}

export default App;
