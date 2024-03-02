import {useState,useEffect} from 'react';
import moment from 'moment';
import axios from "axios";
import {useParams} from "react-router-dom";
import { FaBahtSign } from "react-icons/fa6";
import {Badge} from 'antd';
import{
    FaProjectDiagram,
    FaRegClock,
    FaCheck,
    FaTimes,
    FaTruckMoving,
    FaWarehouse,
    FaRocket
} from "react-icons/fa";
import ProductCard from '../components/cards/ProductCard';
import toast from 'react-hot-toast';
import {useCart} from"../context/cart";


export default function ProductView(){
    //context
    const[cart,setCart] =useCart();
    //state
    const [product,setProduct] = useState({});
    const [related,setRelated] = useState([]);
    //hooks
    const params = useParams();

    useEffect(()=>{
        if(params?.slug) loadProduct();
    },[params?.slug]);

    const loadProduct = async(req,res)=>{
        try{
            const {data} = await axios.get(`/product/${params.slug}`);
            setProduct(data);
            loadRelated(data._id,data.category._id);
        } catch(err){
            console.log(err);
        }
    };
    const loadRelated = async(productId,categoryId)=>{
        try{
            const{data} =await axios.get(`/related-products/${productId}/${categoryId}`
            );
            setRelated(data);
        } catch (err) {
            console.log(err);
          }
    }
    return (
       <div className = "container-fluid">
        <div className = "row">
            <div className = "col-md-9">
            <div  className ="card mb-3 ">
            <Badge.Ribbon text={`${product?.sold}sold`}color="red" >
            <Badge.Ribbon 
                text={`${
                    product?.quantity>= 1 
                    ?`${product?.quantity-product?.sold}In Stock`
                    :"สินค้าหมด"
                }`}
                placement="start"
                color="green"
                >
                </Badge.Ribbon>  
        </Badge.Ribbon>
            <img 
            src = {`${process.env.REACT_APP_API}/product/photo/${product?._id}`}
            alt={product.name}
            style = {{height:"500px",width:'100%',objectFit:"cover",}}
            />
        <div className = "card-body">
            <h1 className = "fw-bold">{product?.name}</h1>
            <p className = "card-text lead">{product?.description}</p>
            </div>

            <div className= "d-flex justify-content-between lead p-5 bg-light fw-bold" >
                <div>
                    <p>
                    <FaBahtSign /> Price:{""}
                    {product?.price?.toLocaleString("th-TH",{
                    currency:"THB",
                     style:"currency",
                    })}
                    </p>
                    <p>
                    <FaProjectDiagram/> Category: {product?.category?.name}
                    </p>
                    <p>
                    <FaRegClock/> Added: {moment(product.createdAt).fromNow()}</p>
                    <p>{product?.quantity>0 ?<FaCheck/>:<FaTimes/>} {product?.quantity>0?"มีสินค้า":"สินค้าหมด"}
                    </p> 

                    <p>
                    <FaWarehouse/> Available {product?.quantity-product?.sold}
                    </p>
                    
                    <p>
                    <FaRocket/> Sold {product.sold}
                    </p>
                </div>
            </div>

        <div className = "d-flex justify-content-between ">
            <button className = "btn btn-outline-primary col card-button"
            style={{borderBottomRightRadius:"10px"}}
            onClick={()=>{
                setCart([...cart,product]);
                toast.success("เพิ่มสินค้าลงในตะกร้า");
             }}>
    
                Add to cart
                </button>
                </div>   
        </div>
        </div>
        <div className = "col-md-3">
            <h2>Related Products</h2>
            <hr/>
            {related?.length<1 &&<p>Nothing found</p>}
            {related?.map((p)=>(
                <ProductCard p={p} key={p._id}/>
                ))}
            </div>
        </div>
       </div>
    )
}