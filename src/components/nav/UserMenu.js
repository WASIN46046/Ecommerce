import { NavLink } from "react-router-dom"

export default function UserMenu(){
    return(
        <>
        <div className ="p-3 mt-2 mb-2 h4 bg-light">หน้าผู้ใช้งาน</div>  
            
     <ul className = "list-group list-unstyled">
        <li>
        <NavLink className = "list-group-item" to="/dashboard/user/profile">
        โปรไฟล์
         </NavLink>
         </li>
        <li>
        <NavLink className = "list-group-item" to="/dashboard/user/orders">
        คำสั่งซื้อทั้งหมด</NavLink>
        </li>
        </ul>
        </>
    )
}