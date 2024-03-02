import {useSearch} from'../context/search';
import ProductCard from '../components/cards/ProductCard';
import Jumbotron from '../components/cards/Jumbotron';


export default function Search (){
const [values,setValues] = useSearch();

    return (
    <>
    <Jumbotron 
    title = "สินค้าที่พบเจอ"
     subTitle={
        values?.result?.length<1 
        ? 'ไม่มีสินค้าที่ถูกพบ'
        :`รายการสินค้าจำนวน ${values?.results?.length} ชิ้น`
    }
    />

    <div className = "container mt-3">
        <div className = "row">
            {values?.results?.map(p=>(
                <div key ={p._id} className = "col-md-4">
                    <ProductCard p = {p}/>
                    </div>
            ))}
        </div>
    </div>
    </>
    );
}