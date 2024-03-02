import { BrowserRouter,Routes,Route } from "react-router-dom";
import Menu from './components/nav/Menu.js';
import {Toaster} from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from './components/routes/PrivateRoute';
import AdminDashboard from './pages/admin/Dashboard';
import AdminRoute from './components/routes/AdminRoute';
import AdminCategory from "./pages/admin/Category.js";
import AdminProducts from "./pages/admin/Products";
import UserOrders from './pages/user/Orders.js';
import UserProfile from "./pages/user/Profile";
import AdminProduct from "./pages/admin/Product.js";
import AdminProductUpdate from "./pages/admin/ProductUpdate";
import Shop from'./pages/Shop';
import Search from "./pages/Search";
import ProductView from "./pages/ProductView";
import CategoriesList from "./pages/CategoriesList.js";
import CategoryView from "./pages/CategoryView.js";
import Cart from './pages/Cart.js';
import AdminOrders from "./pages/admin/Orders.js";



const PageNotFound =()=>{
  return(
  <div className ="d-flex justify-content-center align-items-center vh-100">
404 | Page not found </div>
);
};

export default function App(){  
  return(
  <BrowserRouter>
  <Menu />
  <Toaster position ="top-right"/>
  <Routes>
    <Route path = "/" element={<Home/>}/>
    <Route path = "/Shop" element={<Shop/>}/>
    <Route path = "/categories" element={<CategoriesList/>}/>
    <Route path = "/category/:slug" element={<CategoryView/>}/>
    <Route path = "/cart" element={<Cart/>}/>
    <Route path="/search" element={<Search />} />
    <Route path="/product/:slug" element={<ProductView />} />
    <Route path = "/login" element={<Login/>}/>
    <Route path = "/register" element={<Register/>}/>
    <Route path = "/dashboard" element={<PrivateRoute/>}>
      <Route path = "user" element={<Dashboard/>}/>
      <Route path = "user/profile" element={<UserProfile/>}/>
      <Route path = "user/orders" element={<UserOrders/>}/>
    </Route>

    <Route path = "/dashboard" element={<AdminRoute/>}>
     <Route path = "admin" element={<AdminDashboard/>}/>
     <Route path = "admin/category" element={<AdminCategory/>}/>
     <Route path = "admin/product" element={<AdminProduct/>}/>
     <Route path = "admin/products" element={<AdminProducts/>}/>
     <Route
     path = "admin/product/update/:slug" 
     element={<AdminProductUpdate/>}
     />
    <Route path = "admin/orders" element={<AdminOrders/>}/>
    </Route>
    <Route path="*"element ={<PageNotFound/>}replace/>
    </Routes>
    </BrowserRouter>  
    );
};
