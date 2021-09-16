// import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap' 
import Navbar from './components/Navbar';
import Home from './screens/Home';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import Orders from './screens/Orders';
import Admin from './screens/Admin';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Switch>
      <Route exact path={"/cart"} exact component={Cart}/>
      <Route exact path={"/register"} exact component={Register}/>
      <Route exact path={"/login"} exact component={Login}/>
      <Route exact path={"/"} exact component={Home}/>
      <Route exact path={"/orders"} exact component={Orders}/>
      <Route path={"/admin"} component={Admin}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
