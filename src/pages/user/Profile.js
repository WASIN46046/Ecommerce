import {useState,useEffect} from"react";
import {useAuth} from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserProfile(){
    //context
    const [auth,setAuth]=useAuth();
    //state
    const[name,setName] =useState("");
    const[email,setEmail] =useState("");
    const[password,setPassword] =useState("");
    const[address,setAddress] =useState("");


    useEffect(()=>{
        if(auth?.user){
            const{name,email,address} =auth.user;
            setName(name);
            setEmail(email);
            setAddress(address);
        }
    },[auth?.user]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const { data }= await axios.put("/profile",{
            name,
            password,
            address,
            });
           // console.log("profile updated =>",data);
    //        if (data?.error) {
    //         toast.error(data.error);
    //       } else {
    //         setAuth({ ...auth, user: data });
    //         // local storage update
    //         let ls = localStorage.getItem("auth");
    //         ls = JSON.parse(ls);
    //         ls.user = data;
    //         localStorage.setItem("auth", JSON.stringify(ls));
    //         toast.success("Profile updated");
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };

           if (data?.error) {
            toast.error(data.error);
          } else {
            setAuth({ ...auth, user: data });
            // local storage update
            let ls = localStorage.getItem("auth");
            if (ls && typeof ls === 'string') {
                try {
                    ls = JSON.parse(ls);}
            catch (error) {
                console.error("Error parsing JSON from local storage:", error);
                ls = {};
            }
            }else {
                ls = {}; //
            }
            
            ls.user = data;
            localStorage.setItem("auth", JSON.stringify(ls));
            toast.success("Profile updated");
          }
        } catch (err) {
          console.log(err);
        }
      };



    return(
        <>
        <Jumbotron title={` ${auth?.user?.name}`} subTitle= "Profile" />

        <div className = "container-fluid">
            <div className = "row">
                <div className ="col-md-3">
                <UserMenu/>
                </div>     
                <div className ="col-md-9">
                <div className ="p-3 mt-2 mb-2 h4 bg-light"> โปรไฟล์</div>

            <form onSubmit = {handleSubmit}>
                <input type = "text"
                 className = "form-control m-2 p-2"
                 placeholder = "ชื่อสินค้า"
                 value={name}
                 onChange ={(e)=> setName (e.target.value)}
                 autoFocus={true}
            />

                <input 
                type = "email"
                 className = "form-control m-2 p-2"
                 placeholder = "กรุณาใส่ E-mail"
                 value={email}
                 onChange ={(e)=> setEmail(e.target.value)}
                 disabled={true}
            />

                <input type = "password"
                 className = "form-control m-2 p-2"
                 placeholder = "Password"
                 value={password}
                 onChange ={(e)=> setPassword(e.target.value)}
            />

            <textarea className ="form-control m-2 p-2" 
            placeholder="กรุณากรอกที่อยู่"
            value = {address}
            onChange ={(e)=> setAddress(e.target.value)}
            />

            <button className = "btn btn-primary m-2 p-2">Submit</button>
            </form>

            </div>
            </div>
            </div>
        </>
    );
}