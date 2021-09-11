import './App.css';
import Signup from "./Components/Signup";
import Login from "./Components/Login"
import AuthProvider from "./Context/AuthProvider";
import Feed from "./Components/Feed"
import Profile from './Components/Profile';
import Ioa from "./Components/Ioa"
import PrivateRoute from './Components/PrivateRoute';
import ProfileRoute from './Components/ProfileRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Main from "./MaterialUI/Main"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
function App() {
  return (
    <Router>
      <AuthProvider>
      <Switch>
    
          <PrivateRoute exact path='/' component={Feed}/>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <ProfileRoute path='/profile' component={Profile}/>
         </Switch>
        </AuthProvider>
      
    </Router>
  // //  <Main></Main>
    // <Ioa/>
  );
}

export default App;
