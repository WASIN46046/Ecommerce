import { useEffect,useState } from "react";
import {useAuth} from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import  axios  from "axios";
import ProductCardHorizontal from "../../components/cards/ProductCardHorizontal";
import moment from "moment";


export default function UserOrders() {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      if (auth?.token) getOrders();
    }, [auth?.token]);
  
    const getOrders = async () => {
      try {
        const { data } = await axios.get("/orders");
        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <>
        <Jumbotron title={` ${auth?.user?.name}`} subTitle="Dashboard" />
  
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="p-3 mt-2 mb-2 h4 bg-light">คำสั่งซื้อทั้งหมด</div>
  
              {orders?.map((o, i) => {
                return (
                  <div
                    key={o._id}
                    className="border shadow bg-light rounded-4 mb-5"
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">สถานะ</th>
                          <th scope="col">ผู้ซื้อ</th>
                          <th scope="col">สินค้าที่สั่งซื้อ</th>
                          <th scope="col">การจ่ายเงิน</th>
                          <th scope="col">จำนวน</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "สำเร็จ" : "ล้มเหลว"}</td>
                          <td>จำนวน {o?.products?.length}ชิ้น </td>
                        </tr>
                      </tbody>
                    </table>
  
                    <div className="container">
                      <div className="row m-2">
                        {o?.products?.map((p, i) => (
                          <ProductCardHorizontal key={i} p={p} remove={false} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }