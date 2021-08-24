import React,{useState,useEffect,useContext} from 'react'
import { auth } from "../firebase"
export const AuthContext = React.createContext();

function AuthProvider({children}) {
    const[currentUser, setCurrentUser] = useState();
    const[loading, setLoading] = useState(true);
    
    {/*signup,login,logout returns a promise */}
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function login(email,password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    function logout() {
        return auth.signOut();
    }
    const value = {
        currentUser,
        login,
        signup,
        logout
    }
   
    {/*Initially use effect will run then after getiing user and setting loading as false ,render will work */ }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {    {/*if loading is true then use effect checks the current user if any,the state of current user is set as the user or null if no user & loading is set to false */}
            setCurrentUser(user);
            setLoading(false);
        })
        return () => {
            unsubscribe();    {/*cleanup,will stop tracking user*/}
        }
    },[])
    return (
        <AuthContext.Provider value={value}>
            {!loading&&children}   {/*checks if loading is false and children are there*/}
        </AuthContext.Provider>
    )
}

export default AuthProvider
