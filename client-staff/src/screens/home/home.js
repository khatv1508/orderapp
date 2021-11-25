import React from "react";
import "./home.css";
import {
    Grid,
    Button,
    Avatar,
    Divider,
    Card,
    CardContent,
    CardActions,
    Chip,
    Stepper,
    Step,
    StepLabel,
    IconButton,
    Dialog,
    DialogTitle,
    DialogActions
} from '@mui/material';
import tableIcon from "../../assets/image/table.png";
import { RiCheckboxBlankCircleFill, RiIndeterminateCircleFill } from "react-icons/ri";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import Order from "../../components/order/order";
import RefreshBtn from "../../components/refresh-btn/refresh";
import { useSelector, useDispatch } from 'react-redux';
import ShowMore from "../../components/order/show_more";
import { fetchAllTableDetail } from "../../store/thunk/thunk-table";
import { fetchAllTurn } from "../../store/thunk/thunk-history";
import { fetchUpdateBill } from "../../store/thunk/thunk-order";

// Table item
const TableItem = ({table, payTable, setPayTable}) => {
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch();
    const itemCount =  table.turns ? table.turns.length : 0;
    const expandClick = () => {
        if(itemCount > 2) setExpanded((prev) => !prev);
    }
    return (
        <Card className="table-item"
            style={payTable === table.number ? {border: "2px solid red"} : {}}
        >
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Avatar className="avatar-table" alt="" src={tableIcon} />
                <div style={{width: "100%"}}>
                    <h3>Table #{table.number}</h3>
                </div>
                <IconButton onClick={expandClick} size="small" style={{marginRight: "10px"}}>
                    {expanded ? <MdExpandLess style={{padding: "5px", fontSize: "25px"}}/> 
                    : <MdExpandMore style={{padding: "5px", fontSize: "25px"}}/>
                    }
                </IconButton>
            </div>
            <Divider style={{width: "calc(100% - 25px)", margin: "0 10px"}} />

            <CardContent 
                style={{display: "flex", 
                justifyContent: "space-between", 
                alignItems: "flex-start", 
                flexDirection: "column"}}
            >
                <Stepper orientation="vertical" > 
                    {table.turns ? table.turns.map((turn, index) => {
                        if(!Boolean(expanded) && index > 1){
                            // eslint-disable-next-line
                            return;
                        } 
                        return <Step key={index} active={false} >
                            <StepLabel icon={<RiCheckboxBlankCircleFill color="#FF6347" 
                            style={{paddingLeft: "5px"}}/>}>
                                <div style={{paddingLeft: "15px"}}>
                                    <p style={{margin: 0}}>
                                        x{turn.items} item
                                    </p>
                                    <h3 style={{margin: "5px 0"}}>
                                        Total: {turn.total}
                                    </h3>
                                </div>
                            </StepLabel>
                        </Step>
                    }) : <Step key={`${table.number}-no-order`} active={false}>
                        <StepLabel icon={<RiCheckboxBlankCircleFill color="#FF6347" 
                        style={{paddingLeft: "5px"}}/>}>
                            <div style={{paddingLeft: "15px"}}>
                                <p style={{margin: 0}}></p>
                                <h3 style={{margin: "5px 0"}}>
                                    No Order
                                </h3>
                            </div>
                        </StepLabel>
                    </Step>}
                </Stepper>
                {itemCount > 2 && !expanded && <p style={{margin: "5px"}}>Show more ...</p>}
            </CardContent>

            <Divider style={{width: "calc(100% - 25px)", margin: "0 10px"}} />

            <h3 style={{textAlign: "right", marginRight: "20px"}}>Bill Total: {table.turnTotal}</h3>

            <CardActions style={{display: "flex", justifyContent: "space-between", padding: "20px 10px"}}>
                {table.status === 0 ? 
                    <Button variant="outlined" style={{border: "2px solid"}} startIcon={<RiIndeterminateCircleFill />}>
                        Inactive
                    </Button> : 
                    <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                        <Button variant="outlined" color="secondary" style={{border: "2px solid"}} startIcon={<RiCheckboxBlankCircleFill />}>
                            Active
                        </Button>
                        <Button variant="outlined" style={{border: "2px solid", marginLeft: ""}} 
                            onClick={()=> {
                                dispatch(fetchUpdateBill(table.bill_id));
                                setPayTable(undefined);
                            }}
                        >
                            Pay Bill
                        </Button>
                    </div>
                }
            </CardActions>
        </Card>
    );
}

function Home() {
    const {list_new_order} = useSelector((state) => state.historyForm);

    const orderCount = list_new_order ? list_new_order.length : 0;

    const {list_table_detail} = useSelector((state) => state.tableForm);
    const dispatch = useDispatch();

    const [tableDetails, setTableDetails] = React.useState(list_table_detail);

    React.useEffect(() => {
        setTableDetails(list_table_detail);
    }, [list_table_detail]);

    const refreshTable = () => {
        dispatch(fetchAllTableDetail());
        }

    const refreshNewOrder = () => {
        dispatch(fetchAllTurn(0));
    }

    const [open, setOpen] = React.useState(false);
    const [payTable, setPayTable] = React.useState(undefined);

    const handleClose = () => {
        setOpen(false);
    };

    //  socket io
    const { socket } = useSelector((state) => state.socket);

    React.useEffect(() => {
        socket && socket.on("has-order", () => {
            refreshTable();
            refreshNewOrder();
        }); 
        socket && socket.on("has-pay", (arg) => {
            setOpen(true);
            setPayTable(arg);
        }); 
        // eslint-disable-next-line
    },[socket]);

    

    return (
        <div style={{padding: "0 20px"}}>
            <ShowMore />
            <Grid container spacing={2}>
                <Grid item lg={9} 
                style={{display: "flex", justifyContent: "space-between"}}>
                    <h2 className="title">
                        Table List
                    </h2>
                    <RefreshBtn onHandleClick={refreshTable}/>
                </Grid>
                <Grid item lg={3} style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <h2 className="title" style={{padding: "0 10px", display: "inline-block"}}>
                            New Order
                        </h2>
                        {orderCount > 0 && <Chip
                            style={{marginTop: "-15px", background: "red", color: "white"}}
                            label={orderCount}
                            variant="outlined"
                        />
                        }
                    </div>
                    <RefreshBtn onHandleClick={refreshNewOrder}/>
                </Grid>

                <Grid container spacing={2} item lg={9} className="step-table">
                    {tableDetails && tableDetails.map((tableDetail, index) => {
                        return <Grid key={index} item lg={3} className="table"> 
                            <TableItem table={tableDetail} payTable={payTable} setPayTable={setPayTable}/>
                        </Grid>
                    })}
                    
                </Grid>

                <Grid item lg={3} className="new-order">
                    {list_new_order && list_new_order.map((order, index) => {
                        return <Order key={`order-${index}`} order={order}/>
                    })}
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Table {payTable} muốn thanh toán !
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Home;