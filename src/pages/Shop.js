import{useState,useEffect} from'react';
import Jumbotron from '../components/cards/Jumbotron';
import axios from "axios";
import ProductCard from '../components/cards/ProductCard';
import { Checkbox,Radio} from 'antd';
import {prices} from '../prices';


export default function Shop(){
    const[categories,setCategories]=useState([]);
    const[products,setProducts]=useState([]);
    const[checked,setChecked] = useState([]); //categories
    const[radio,setRadio] = useState([]); //radio


    useEffect(() => {
        if (!checked.length || !radio.length) loadProducts();
      }, []);
    
      useEffect(() => {
        if (checked.length || radio.length) loadFilteredProducts();
      }, [checked, radio]);

      const loadFilteredProducts = async () => {
        try {
          const { data } = await axios.post("/filtered-products", {
            checked,
            radio,
          });
          console.log("filtered products", data);
          setProducts(data);
        } catch (err) {
          console.log(err);
        }
      };
    useEffect(()=>{
        loadProducts();
    },[]);

const loadProducts = async()=>{
    try{
        const{data} = await axios.get("/products");
        setProducts(data);
    } catch(err){
        console.log(err);
    }
};

useEffect(()=>{
    loadCategories();
}, []);

    const loadCategories = async() =>{
        try{
            const{data} = await axios.get('/categories');
            setCategories(data);
        } catch (err){
            console.log(err);
        }
    };

    const handleCheck = (value,id) =>{

        let all = [...checked];
        if(value){
            all.push(id);
        } else{
            all = all.filter((c)=>c !== id);
        }
        setChecked(all);
    };


    return(
     <>
    <Jumbotron title = "รายการสินค้า" />
    <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              คัดกรอง หมวดหมู่สินค้า
            </h2> 
            <div className="row p-5 ">{categories?.map((c) => (
                <Checkbox 
                  key={c._id} 
                  onChange={(e)=>handleCheck(e.target.checked,c._id)}
                  style ={{fontSize: '1.25vw'}}>
                  {c.name}
                </Checkbox>
              ))}
              </div>
      

        <h2 className = "p-3 mt-2 mb-2 h4 bg-light text-center text-lg ">
        คัดกรอง ราคาสินค้า
        </h2>
            <div className = "row p-5 font-weight-bold ">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
                {prices?.map(p=>(
                    <div key = {p._id}  className="radio-style" style={{ marginLeft: '8px' }}>
                      <Radio value ={p.array}>{p.name}</Radio>
                        </div>  
                ))}
            </Radio.Group>
            </div>
             
        </div>
       
       
        <div className="col-md-9">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
            สินค้าจำนวน {products?.length} รายการ
            </h2>

            <div className = "row"style = {{
                height:"100vh",overflow:"scroll"}}>
            {products?.map((p)=>(
                <div className ="col-md-4"
                    key={p._id}>
                <ProductCard p ={p}/>
                </div>
            ))}
        </div>
    </div>
    </div>
    </div>
</>
);
            }
            
