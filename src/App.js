import Signup from "./Components/Signup";
import AuthProvider from "./Context/AuthProvider";
import Main from "./MaterialUI/Main"
function App() {
  return (
    // <AuthProvider>
    //   <Signup/>   {/*Signup is passed as a children to AuthProvider */}
    // </AuthProvider>
   <Main></Main>
  );
}

export default App;
