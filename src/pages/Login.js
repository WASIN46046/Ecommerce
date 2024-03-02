import {useState} from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import toast ,{Toaster} from "react-hot-toast";
import {useAuth} from "../context/auth.js";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login(){
  //state
  const[email,setEmail]=useState("spider11@gmail.com");
  const[password,setPassword]=useState("1234567");
  //hook
  const[auth,setAuth]=useAuth();
  const navigate = useNavigate();
  const location = useLocation();

 //console.log('location =>',location)

  const handleSubmit = async( e )=>{ 
    e.preventDefault();
    try{
      const { data } = await axios.post(
        `/login`,
      {
        email,
        password,
      });
      console.log(data);
      if(data?.error){
       toast.error(data.error);
      }else{
        localStorage.setItem("auth",(data));
        setAuth({...auth, token:data.token, user:data.user});  
       toast.success("เข้าสู่ระบบ สำเร็จ");
       navigate(location.state || `/dashboard/${data?.user?.role === 1 ?"admin" :"user"}`
       );
      };
    }catch(err){
      console.log(err);
      toast.error('เข้าสู่ระบบ ล้มเหลว ,กรุณาลองใหม่อีกครั้ง')
    }
  };
    return(
      <div>
        <Jumbotron title = "เข้าสู่ระบบ" />
        <Toaster />
        <div className ="container">
          <div className = "row">
            <div className = "col-md-6 offset-md-3 mt-5" >
              <form onSubmit={handleSubmit}>
                <input 
              type = "email"
               className ="form-control mb-4 p-2"
               placeholder="กรุณาใส่ E-mail"
               value ={email}
               onChange={(e)=> setEmail(e.target.value)}
               />
                <input 
              type = "password"
               className ="form-control mb-4 p-2"
               placeholder="Enter your password"
               value ={password}
               onChange={(e)=> setPassword(e.target.value)}
               />
               <button 
               className ="btn btn-primary" 
               type="submit" 
               onClick ={handleSubmit}>
                Submit
               </button>
               </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

