import {Badge} from "antd";
import { useNavigate, useNavigation } from "react-router-dom";
import {useCart} from'../../context/cart';
import toast from 'react-hot-toast';

export default function ProductCard({p}) {
    //context
const[cart,setCart] =useCart();
//hook
const navigate = useNavigate();

    return(
        <div  className ="card mb-3 hoverable"  key = {p._id}>
            <Badge.Ribbon text={`${p.sold} sold`}color="red" className="custom-badge-ribbon"  >
            <Badge.Ribbon 
                text={`${
                    p?.quantity>= 1 
                    ?`${p?.quantity-p?.sold}In Stock`
                    :"Out of stock"
                }`
                }
                placement="start"
                color="green"
                className="custom-badge-ribbon"
                >
                </Badge.Ribbon>  
        </Badge.Ribbon>
            <img src = {`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style = {{height:"650px",objectFit:"cover",}}
            />
        <div className = "card-body">
            <h5>{p.name}</h5>

            <h4 className = "fw-bold">
            {p?.price?.toLocaleString("th-TH",{
                currency:"THB",
                style:"currency"
            })}
            </h4>

            <p className = "card-text">{p?.description?.substring(0,60)}...</p>
            </div>

        <div className = "d-flex justify-content-between ">
                <button className = "btn btn-primary col card-button"
                style={{borderBottomLeftRadius:"10px"}}
                onClick={()=>navigate(`/product/${p.slug}`)}
                >
                สินค้า
                </button>

                <button 
                className = "btn btn-outline-primary col card-button"
                style={{borderBottomRightRadius:"10px"}}
                onClick={()=>{
                    setCart([...cart,p]);
                    localStorage.setItem('cart',JSON.stringify(cart));
                    toast.success("เพิ่มรายการสินค้า");
                 }}
                >
                เพิ่มในตะกร้า
                </button>
                </div>   
        </div>

    );
    }

    //this is my product description