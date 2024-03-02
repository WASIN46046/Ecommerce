import {useState,useEffect} from "react";
import {useAuth} from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
import {Modal} from "antd";

export default function AdminCategory(){
    //context
    const [auth,setAuth]=useAuth();
    //state
    const [name,setName]=useState("");
    const[categories,setCategories]=useState([]);
    const[visible,setVisible]=useState(false);
    const[selected,setSelected]=useState(null);
    const[updatingName,setUpdatingName] =useState("");


    const loadCategories =async()=>{
        try{
            const {data} = await axios.get("/categories");
            setCategories(data);
        }catch(err){
            console.log(err);
        }
    };
    useEffect(()=>{
        loadCategories();
    },[]);

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const{data} = await axios.post("/category",{name});
            if(data?.error){
                toast.error(data.error);
            } else{
                loadCategories();
                setName("");
                toast.success(`"${data.name}" ถูกสร้างแล้ว `)
            }
        }catch(err){
            console.log(err);
            toast.error("การสร้างหมวดหมู่ล้มเหลว,กรุณาลองอีกครั้ง");
        }
    };

    const handleUpdate = async(e)=>{
        e.preventDefault();
        try{
            const{data} = await axios.put(`/category/${selected._id}`,{
                name:updatingName,
            });
            if(data?.error){
            toast.error(data.error);   
            }else{
                toast.success(`"${data.name}" ถูกอัพเดทแล้ว`);
                setSelected(null);
                setUpdatingName("");
                loadCategories()
                setVisible(false);
            }
        }catch(err){
            console.log(err);
            toast.error("มีหมวดหมู่นี้อยู่แล้ว,กรุณาลองอีกครั้ง");
        }
    };

    const handleDelete = async(e)=>{
        e.preventDefault();
        try{
            const{data} = await axios.delete(`/category/${selected._id}`);
            if(data?.error){
            toast.error(data.error);   
            }else{
                toast.success(`"${data.name}" ถูกลบแล้ว`);
                setSelected(null);
                loadCategories()
                setVisible(false);
            }
        }catch(err){
            console.log(err);
            toast.error("มีหมวดหมู่นี้อยู่แล้ว,กรุณาลองอีกครั้ง");
        }
    }

    return(
        <>
        <Jumbotron
        title={` ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
        />

        <div className = "container-fluid">
            <div className = "row">
                <div className ="col-md-3">
                <AdminMenu/>
                </div>     
                <div className ="col-md-9">
                <div className ="p-3 mt-2 mb-2 h4 bg-light">
                    จัดการหมวดหมู่</div>

                <CategoryForm 
               value={name}
               setValue={setName}
               handleSubmit={handleSubmit}
                buttonText="Submit"
                />

                    <hr/>

                 <div className = "d-flex">
                    {categories?.map((c)=>(
                        <button key ={c.id}className ="btn btn-primary m-3"
                        onClick ={()=>{
                            setVisible(true);
                            setSelected(c);
                            setUpdatingName(c.name);
                        }}>
                        {c.name}
                        </button>
                        ))}
                    </div>
               
                    <Modal 
                    open={visible} 
                    onOk={()=>setVisible(false)}
                    onCancel ={()=>setVisible(false)}
                    footer ={null}
                >
                 <CategoryForm 
                value = {updatingName} 
                setValue = {setUpdatingName}
                handleSubmit = {handleUpdate}
                buttonText="Update"
                handleDelete={handleDelete}
                />
                 </Modal>
            </div>
            </div>
            </div>
        </>
    );
}