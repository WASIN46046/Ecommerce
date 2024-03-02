export default function Jumbotron ({
  title,subTitle="ยินดีต้อนรับ การเข้าเว็ปไซต์ของ วศิน จรัสพิกุลทิพย์",
}){
    return (
      <div className="container-fluid jumbotron"style={{marginTop:"-8px",height:"300px"}}>
        <div className = "row">
        <div className = "col text-center p-5 mt-4 ">
          <h1 className = "fw-bold display-1 ">{title}</h1>
          <p className = "lead">{subTitle}</p>
          </div>
        </div>
      </div>
    );
  }