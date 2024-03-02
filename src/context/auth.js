import {useState,createContext,useContext,useEffect} from "react";
import axios from"axios";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:"",
    });

//axios config
axios.defaults.baseURL=process.env.REACT_APP_API;
axios.defaults.headers.common["Authorization"]=auth?.token;

useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
        try {
      const parsed = JSON.parse(data);
      setAuth((auth)=>({...auth,user:parsed.user,token:parsed.token}))
           }   catch (error) {
     console.error("Error parsing JSON data from localStorage:", error);
      }
    }       
}, []);

    return (
        <AuthContext.Provider value ={[auth,setAuth]}>
        {children}
        </AuthContext.Provider>
    );
};
const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider};


