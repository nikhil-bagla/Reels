import './App.css';
import Signup from "./Components/Signup";
import Login from "./Components/Login"
import AuthProvider from "./Context/AuthProvider";
import Feed from "./Components/Feed"
import Ioa from "./Components/Ioa"
// import Main from "./MaterialUI/Main"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
function App() {
  return (
    <Router>
      <AuthProvider>
      <Switch>
    
          <Route exact path='/' component={Feed}/>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup}/>
         </Switch>
        </AuthProvider>
      
    </Router>
  // //  <Main></Main>
    // <Ioa/>
  );
}

export default App;
