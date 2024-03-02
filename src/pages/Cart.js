import{useAuth} from'../context/auth';
import {useCart} from '../context/cart';
import Jumbotron from '../components/cards/Jumbotron';
import { useNavigate } from 'react-router-dom';
import UserCartSidebar from '../components/cards/UserCartSidebar';
import ProductCardHorizontal from '../components/cards/ProductCardHorizontal';



export default function Cart(){
    //context
    const[cart,setCart] =useCart();
    const[auth,setAuth] = useAuth();
    //hooks
    const navigate = useNavigate();
  


    return (
        <>
          <Jumbotron
            title={`${auth?.token && auth?.user?.name}`}
            subTitle={
              cart?.length
                ? `คุณมีสินค้าจำนวน ${cart.length} ในตะกร้า ${
                    auth?.token ? "" : "กรุณาเข้าสู่ระบบก่อนการชำระเงิน"
                  }`
                : "ตะกร้าสินค้าว่างเปล่า"
            }
          />
    
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
                  {cart?.length ? (
                    "ตะกร้าของฉัน"
                  ) : (
                    <div className="text-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate("/")}
                      >
                        เลือกสินค้าต่อ
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
    
          {cart?.length && (
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="row">
                    {cart?.map((p,index) => (
                      <ProductCardHorizontal key={index} p={p}/>
              ))}
                </div>
              </div>
              <UserCartSidebar/>
              </div>
              </div>
          )}
              </>
      ); 
    }