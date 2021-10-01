import "./order.css";
import {
    Avatar,
    Divider,
    Card,
    CardContent,
    CardActions,
    IconButton, 
    Button
} from '@mui/material';
import staff from "../../assets/image/staff.png";
import imageDefault from "../../assets/image/no-image.png";
import { IoMdCheckmark, IoMdClose} from "react-icons/io";


// Order item
function Order ({order}) {
    return (
        <Card key={order.turn} className="order-item">
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div style={{width: "100%", padding: "0 10px"}}>
                    <h3 style={{marginBottom: 0}}>{`Table #${order.table} - Turn #${order.turn}`}</h3>
                    <p style={{marginTop: "5px"}}>{order.date}</p>
                </div>
                <Avatar className="avatar-staff" alt="" 
                    src={order.staffAvatar ? order.staffAvatar : staff} />
            </div>
          <CardContent className="item-center">
              {order.menus && order.menus.map((menu, index) => {
                  return <div key={index} style={{ width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBottom: "15px"}}
                        >
                        <img alt="" 
                            src={menu.imageUrl ? menu.imageUrl : imageDefault} 
                            style={{width: "75px", height: "75px", borderRadius: "50%"}}
                        />
                        <div style={{width: "100%", paddingLeft: "15px"}}>
                            <h3 style={{marginBottom: 0, textAlign: "justify"}}>{menu.name}</h3>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <p style={{marginTop: "5px"}}>Price: {menu.price}</p>
                                <p style={{marginTop: "5px"}}>Qty: {menu.qty}</p>
                            </div>
                        </div>
                  </div>
              })}
                
          </CardContent>
          <Divider style={{width: "calc(100% - 25px)", margin: "0 10px"}} />
          <CardActions style={{display: "flex", justifyContent: "space-between"}}>
            <div>
                <p style={{marginBottom: 0}}>x{order.items} item</p>
                <h3 style={{marginTop: "5px"}}>Total: {order.total}</h3>
            </div>
            {order.status === 0 ? 
            <div>
                <IconButton style={{border: "3px solid #71cca3", color: "#71cca3", marginRight: "10px"}}>
                    <IoMdCheckmark />
                </IconButton>
                <IconButton style={{border: "3px solid #FF6347", color: "#FF6347"}}>
                    <IoMdClose />
                </IconButton>
            </div> : <div>
                <Button variant="outlined" color="secondary" 
                style={{border: "2px solid", fontSize: "18px"}} 
                startIcon={<IoMdCheckmark />}
                >
                    Completed
                </Button>
            </div>
            }
          </CardActions>
        </Card>
    );
}

export default Order;