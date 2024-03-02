import Jumbotron from "../components/cards/Jumbotron";
import { useState } from "react";
import axios from "axios";
import toast ,{Toaster} from "react-hot-toast";
import {useAuth} from "../context/auth.js";
import { useNavigate } from "react-router-dom";

export default function Register(){
  //state
  const[name,setName] =useState("Ryan");
  const[email,setEmail]=useState("spider11@gmail.com");
  const[password,setPassword]=useState("1234567");
//hooks
 const[auth,setAuth]= useAuth();
 const navigate =useNavigate();

  const handleSubmit = async( e )=>{ 
    e.preventDefault();
    try{
      const { data } = await axios.post( `/register`,
      {
        name,
        email,
        password,
      });
      console.log(data);
      if(data?.error){
       toast.error(data.error);
      }else{
        localStorage.setItem('auth',JSON.stringify(data));
        setAuth({...auth,token:data.token,user:data.user});
       toast.success("ลงทะเบียน สำเร็จ");
       navigate("/dashboard");
      };
    }catch(err){
      console.log(err);
      toast.error('การลงทะเบียนล้มเหลว . กรุณาลองใหม่อีกครั้ง')
    }
  };

    return(
      <div>
        <Jumbotron title = "ลงทะเบียน" />
        <Toaster />
        <div className ="container">
          <div className = "row">
            <div className = "col-md-6 offset-md-3 mt-5">
              <form onSubmit={handleSubmit}>
              <input 
              type = "text"
               className ="form-control mb-4 p-2"
               placeholder="กรุณาใส่ชื่อ-นามสกุล"
               value ={name}
               onChange={(e)=> setName(e.target.value)}
               autoFocus
               />
                <input 

              type = "email"
               className ="form-control mb-4 p-2"
               placeholder="กรุณา ใส่ E-mail"
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
    )
  };
  

