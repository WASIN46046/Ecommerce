import { NavLink } from "react-router-dom";
import { useAuth} from"../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { FaShoppingCart } from "react-icons/fa";



export default function Menu(){
  //hooks
  const [auth,setAuth] =useAuth();
  const[cart,setCart] =useCart();
  //ghook
  const categories = useCategory();
  const navigate = useNavigate();

 // console.log('categories in menu =>',categories);

  const logout = ()=>{
    setAuth({...auth,user:null,token:""});
    localStorage.removeItem("auth");
    navigate("/login");
  };

    return (
      <>
       <nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid ">
    <a className="navbar-brand" herf="#">MC Rich Shop</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
   
      <ul className="navbar-nav">
    
      
      <li className="nav-item">
        <NavLink className="nav-link " to="/">หน้าหลัก</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link"  to="/shop">
            MC Shop
          </NavLink>
        </li>
        
    
        
  

        <div className = "dropdown">
          <li>
            <a className = "nav-link pointer dropdown-toggle"
           data-bs-toggle="dropdown">
            หมวดหมู่สินค้า
            </a> 
          
            
          <ul className = "dropdown-menu"
          style={{height:'190px', overflow: "scroll"}}>



           
        {categories?.map((c)=>(
          <li key ={c._id}>
          <NavLink className="nav-link" to={`/category/${c.slug}`}>
          {c.name}
          </NavLink>
            </li>
            ))}
            
        </ul>
        </li>
        </div>


  
 

        <Search>
          
        <li className = "nav-item">
        <form className = "d-flex">
        <input type = "search"
        
        style ={{borderRadius:"10px"}} 
        className ="form-control"
        placeholder="Search"
        />
        <button 
        className="btn btn-outline-primary" 
        type="submit">Search</button>
      </form>
      </li>
      </Search>
      
      <li className="nav-item mx-3">
        <Badge
           count={cart?.length >= 1 ? cart.length : 0}
            showZero={true}>
        <NavLink  className=" nav-link  " to="/cart">
        <FaShoppingCart className="fa-shopping-cart " size={24} />
          </NavLink>
        </Badge>
        
        </li>
     
      {!auth?.user ?(
          
          <>
           
            <div>
            <li className="nav-item  position-absolute  end-0 mx-5 ">
            <NavLink  className=" nav-link  mx-5  "to="/login">เข้าสู่ระบบ</NavLink>
            </li>
            </div>  

            <div>
            <li className="nav-item position-absolute  end-0">
            <NavLink  className="nav-link mx-1 " to="/register">ลงทะเบียน</NavLink>
            </li>
            </div>  
        
  
      </>

      ) :(
        
        <div className = "dropdown position-absolute  end-0 mx-5">
          <li>
            <a className = "nav-link pointer dropdown-toggle  "
           data-bs-toggle="dropdown">
             {auth?.user?.name?.toUpperCase()}
            </a> 
            
          <ul className = "dropdown-menu">
            <li >
            <NavLink className="nav-link" 
            to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
            }`}
            >
            Dashboard
            </NavLink>

              </li>
              
      
              
        <li className="nav-item pointer">
        <a onClick={logout}  className="nav-link">
          ออกจากระบบ
        </a>
        </li>
        </ul>
        </li>
        </div>
      )}
       </ul>
        </div>
        </div>
        </nav>
      </>
 )}