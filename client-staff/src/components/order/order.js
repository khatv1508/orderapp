import "./order.css";
import React from "react";
import {
    Avatar,
    Divider,
    Card,
    CardContent,
    CardActions,
    IconButton, 
    Button,
    Stack
} from '@mui/material';
import staff from "../../assets/image/staff.png";
import imageDefault from "../../assets/image/no-image.png";
import { IoMdCheckmark } from "react-icons/io";
import { historyFormSlice } from "../../store/slices/history-form";
import { useDispatch } from "react-redux";

// Order item
function Order ({order}) {
    const dispatch = useDispatch();

    const handleShowMoreClick = () => {
        dispatch(historyFormSlice.actions.setShowMore(order));
    }

    const getTotal = () => {
        let result = 0;
        order.bill_details.forEach(element => {
            result += element.amount;
        });
        return result;
    }
    const total = getTotal();

    const countItem = order.bill_details.length;

    return (
        <Card key={order.turn} className="order-item">
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div style={{width: "100%", padding: "0 10px"}}>
                    <h3 style={{marginBottom: 0}}>
                        {`Table #${order.bill.table_id} - Turn #${order.num}`}
                    </h3>
                    <p style={{marginTop: "5px"}}>
                        {order.bill.check_in}
                    </p>
                </div>
                <Avatar className="avatar-staff" alt="" 
                    src={order.staffAvatar ? order.staffAvatar : staff} />
            </div>
          <CardContent className="item-center">
              {order.bill_details && order.bill_details.map((item, index) => {
                if (index < 2) {
                    return <div key={index} style={{ width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBottom: "15px"}}
                        >
                        <img alt="" 
                            src={item.menu.image ? item.menu.image : imageDefault} 
                            style={{width: "75px", height: "75px", borderRadius: "50%"}}
                        />
                        <div style={{width: "100%", paddingLeft: "15px"}}>
                            <h3 style={{marginBottom: 0, textAlign: "justify"}}>{item.menu.food_name}</h3>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <p style={{marginTop: "5px"}}>
                                    Price: {item.menu.price}
                                </p>
                                <p style={{marginTop: "5px"}}>
                                    Qty: {item.quantity}
                                </p>
                            </div>
                        </div>
                    </div>
                }
                return <></>;
            })}
            {countItem > 2 ? <Button onClick={handleShowMoreClick}>Show more...</Button> : <Button disabled>End</Button>}
          </CardContent>
          <Divider style={{width: "calc(100% - 25px)", margin: "0 10px"}} />
          <CardActions style={{display: "flex", justifyContent: "space-between"}}>
            <div>
                <p style={{marginBottom: 0}}>
                    x{countItem} item
                </p>
                <h3 style={{marginTop: "5px"}}>
                    Total: {total}
                </h3>
            </div>
            {order.confirm_status === 0 ? 
            <Stack spacing={2} direction="row">
                <Button variant="outlined"  
                    style={{border: "2px solid", fontSize: "18px", color: "tomato"}}
                >
                    Waitting...
                </Button>
                <IconButton style={{border: "3px solid #71cca3", color: "#71cca3", marginRight: "10px"}}>
                    <IoMdCheckmark />
                </IconButton>
            </Stack> : <div>
                <Button variant="outlined" color="secondary" 
                style={{border: "2px solid", fontSize: "18px"}} 
                startIcon={<IoMdCheckmark />}
                >
                    Approved
                </Button>
            </div>
            }
          </CardActions>
        </Card>
    );
}

export default Order;