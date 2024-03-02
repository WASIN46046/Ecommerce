import { useEffect ,useState} from "react";
import{useAuth} from"../../context/auth";
import{useCart} from "../../context/cart";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";


export default function UserCartSidebar(){

    //context
    const[auth,setAuth] = useAuth();
    const[cart,setCart] = useCart();
    //state
    const [clientToken,setClientToken] = useState("");
    const[instance,setInstance] =useState("");
    const[loading,setLoading] =useState(false);
    //hooks
    const navigate= useNavigate();
   
    
    useEffect(() =>{
        if(auth?.token){
            getClientToken();
        }
    },[auth?.token]);
    
    const getClientToken = async() =>{
        try{
            const {data} = await axios.get("/braintree/token");
            setClientToken(data.clientToken);
        } catch(err){
            console.log(err);
        }
    };



    const cartTotal  =()=>{
        let total = 0;
        cart.map((item)=>{
            total +=item.price;
        });

        return total.toLocaleString("th-TH",{
            currency:"THB",
            style:"currency",
    }); 
};
const handleBuy =async() =>{
    try{
    const {nonce} = await instance.requestPaymentMethod();
    //console.log("nonce =>",nonce);
    const {data} = await axios.post("/braintree/payment",{
        nonce,
        cart,
    });
   // console.log("handle buy response =>",data);
   localStorage.removeItem("cart");
   setCart([]);
   navigate("/dashboard/user/orders");
   toast.success("Payment successful")
        }catch(err){
        console.log(err);
        }
    };
    return (
        <div className ="col-md-4 mb-5">
        <h4>สรุปรายการทั้งหมด</h4>
        รวมยอดทั้งหมด/ที่อยู่/การจ่ายเงิน
        <hr/>
        <h6>ทั้งหมด:{cartTotal()}</h6>

        {auth?.user?.address? (
        <>
         <div className ="mb-3">
            
          <hr/>
          <h4> ที่อยู่จัดส่ง</h4>
          <h5>{auth?.user?.address}</h5>
        </div>
        <button className ="btn btn-warning" 
        onClick ={()=>
        navigate("/dashboard/user/profile")}>
          เปลี่ยนที่อยู่
        </button>
        </>
          ) : (
         <div className ="mb-3">
              {auth?.token ? (
            <button
              className="btn btn-warning"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              เพิ่มที่อยู่จัดส่งสินค้า
            </button>
          ) : (
            <button className = 
            "btn btn-danger" 
            onClick={()=>navigate("/login",{
              state:"/cart",
            })
            }
            >
              เข้าสู่ระบบเพื่อชำระเงิน
            </button>
          )}
         </div>
         
          )}
         
        <div>
        <div className="mt-3">
          {!clientToken ||!cart?.length?(
            ""
             ):(
        <>

          <DropIn 
          options ={{
                authorization :clientToken,
                paypal: {
                    flow: "vault",
                  },
            }}
            onInstance={(instance)=>setInstance(instance)}
            />
            <button 
                onClick={handleBuy}
              className="btn btn-primary col-12 mt-2"
              disabled={!auth?.user?.address || !instance  || loading}   
              >
                 {loading ? "Processing..." : "สั่งซื้อ"}
            </button>
          </>
          )}
             </div>
            </div>
            </div>
    );
    }
        