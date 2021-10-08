import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
}from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { historyFormSlice } from "../../store/slices/history-form";
import imageDefault from "../../assets/image/no-image.png";

function ShowMoreOrder() {
    const dispatch = useDispatch();
    const { show_more } = useSelector((state) => state.historyForm);

    const handleClose = () => {
        dispatch(historyFormSlice.actions.setShowMore(undefined));
    };

    return (
        <div>
            <Dialog
                open={Boolean(show_more)} onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Table #${show_more && show_more.bill.table_id} - Turn #${show_more && show_more.num}`}
                </DialogTitle>
                <DialogContent>
                    {show_more && show_more.bill_details && show_more.bill_details.map((item, index) => {
                        return <div key={index} style={{ width: "100%",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: "20px",
                            paddingRight: "10px"}}
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
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ShowMoreOrder;