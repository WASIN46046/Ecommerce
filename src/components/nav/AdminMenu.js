import { NavLink } from "react-router-dom"
export default function AdminMenu(){
    return(
        <>
        <div className ="p-3 mt-2 mb-2 h4 bg-light">หน้า Admin</div>  

     <ul className = "list-group list-unstyled">
        <li>
        <NavLink className = "list-group-item" to="/dashboard/admin/category">
        สร้างหมวดหมู่
         </NavLink>
         </li>
        <li>
        <NavLink className = "list-group-item" to="/dashboard/admin/product">
        สร้างผลิตภัณฑ์</NavLink>
        </li>

        <li>
        <NavLink className = "list-group-item" to="/dashboard/admin/products">
         สินค้าทั้งหมด</NavLink>
        </li>

        <li>
        <NavLink className = "list-group-item" to="/dashboard/admin/orders">
         จัดการคำสั่งซื้อ</NavLink>
        </li>

        </ul>
        </>
    )
}