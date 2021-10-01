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
    IconButton
} from '@mui/material';
import tableIcon from "../../assets/image/table.png";
import { RiCheckboxBlankCircleFill, RiIndeterminateCircleFill } from "react-icons/ri";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import OrderItem from "../../components/order/order";
import RefreshBtn from "../../components/refresh-btn/refresh";

const tables = [{
    name: 1,
    turns: [{
        items: 1,
        total: 50000,
    },
    {
        items: 2,
        total: 90000,
    },
    {
        items: 2,
        total: 90000,
    },
    {
        items: 2,
        total: 90000,
    },
    {
        items: 2,
        total: 90000,
    },
    {
        items: 2,
        total: 90000,
    }],
    status: 0
},
{
    name: 2,
    turns: [{
        items: 1,
        total: 50000,
    },
    {
        items: 1,
        total: 50000,
    }],
    status: 1
},
{
    name: 2,
    turns: [{
        items: 1,
        total: 50000,
    }],
    status: 1
},
{
    name: 2,
    turns: [{
        items: 1,
        total: 50000,
    }],
    status: 1
},
{
    name: 2,
    turns: [{
        items: 1,
        total: 50000,
    }],
    status: 1
},
{
    name: 2,
    turns: [{
        items: 1,
        total: 50000,
    }],
    status: 1
}];

const orders = [{
    table: 1,
    turn: 1,
    date: "25-09-2021 23:00 PM",
    staffAvatar: "",
    menus: [{
        imageUrl: "https://images.foody.vn/res/g25/244037/s120x120/bc4f48e2-87c8-4f73-8a40-e08c44ae-a14c4fc5-201126092828.jpeg",
        name: "Combo thăn vai bò Mỹ",
        price: 50000,
        qty: 1
    }],
    items: 1,
    total: 50000,
    status: 0
},
{
    table: 2,
    turn: 1,
    date: "25-09-2021 23:00 PM",
    staffAvatar: "",
    menus: [{
        imageUrl: "https://images.foody.vn/res/g25/244037/s120x120/bc4f48e2-87c8-4f73-8a40-e08c44ae-a14c4fc5-201126092828.jpeg",
        name: "Combo thăn vai bò Mỹ",
        price: 50000,
        qty: 1
    },
    {
        imageUrl: "",
        name: "Combo thăn vai bò Mỹ",
        price: 50000,
        qty: 1
    }],
    items: 2,
    total: 100000,
    status: 1
}];

// Table item
const TableItem = ({table}) => {
    const [expanded, setExpanded] = React.useState(false);
    const expandClick = () => {
        if(itemCount > 2) setExpanded((prev) => !prev);
    }
    const itemCount = table ? table.turns.length : 0;

    return (
        <Card className="table-item">
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Avatar className="avatar-table" alt="" src={tableIcon} />
                <div style={{width: "100%"}}>
                    <h3>Table #{table.name}</h3>
                </div>
                <IconButton onClick={expandClick} size="small" style={{marginRight: "10px"}}>
                    {expanded ? <MdExpandLess style={{padding: "5px", fontSize: "25px"}}/> 
                    : <MdExpandMore style={{padding: "5px", fontSize: "25px"}}/>
                    }
                </IconButton>
            </div>
            <Divider style={{width: "calc(100% - 25px)", margin: "0 10px"}} />

            <CardContent style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexDirection: "column"}}>
                <Stepper orientation="vertical" > 
                    {table.turns && table.turns.map((turn, index) => {
                        if(!Boolean(expanded) && index > 1){
                            // eslint-disable-next-line
                            return;
                        } 
                        return <Step key={index} >
                            <StepLabel icon={<RiCheckboxBlankCircleFill color="#FF6347" 
                            style={{paddingLeft: "5px"}}/>}>
                                <div style={{paddingLeft: "15px"}}>
                                    <p style={{margin: 0}}>x{turn.items} item</p>
                                    <h3 style={{margin: "5px 0"}}>Total: {turn.total}</h3>
                                </div>
                            </StepLabel>
                        </Step>
                    })}
                </Stepper>
                {itemCount > 2 && !expanded && <p style={{margin: "5px"}}>Show more ...</p>}
            </CardContent>

            <Divider style={{width: "calc(100% - 25px)", margin: "0 10px"}} />

            <CardActions style={{display: "flex", justifyContent: "space-between", padding: "20px 10px"}}>
                {table.status === 0 ? 
                    <Button variant="outlined" style={{border: "2px solid"}} startIcon={<RiIndeterminateCircleFill />}>
                        Inactive
                    </Button> : 
                    <Button variant="outlined" color="secondary" style={{border: "2px solid"}} startIcon={<RiCheckboxBlankCircleFill />}>
                        Active
                    </Button>
                }
            </CardActions>
        </Card>
    );
}

function Home() {
    const orderCount = orders ? orders.length : 0;
    const refreshTable = () => {
        console.log("reload Table list");
      }

      const refreshNewOrder = () => {
        console.log("reload New Order");
      }
    return (
        <div style={{padding: "0 20px"}}>
            <Grid container spacing={2}>
                <Grid item lg={9} 
                style={{display: "flex", justifyContent: "space-between"}}>
                    <h2 className="title">Table List</h2>
                    <RefreshBtn onHandleClick={refreshTable}/>
                </Grid>
                <Grid item lg={3} style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <h2 className="title" style={{padding: "0 10px", display: "inline-block"}}>New Order</h2>
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
                    {tables.map((table, index) => {
                        return <Grid key={index} item lg={3} className="table"> 
                            <TableItem table={table}/>
                        </Grid>
                    })}
                    
                </Grid>

                <Grid item lg={3} className="new-order">
                    {orders && orders.map((order, index) => {
                        return <OrderItem key={index} order={order}/>
                    })}
                </Grid>
            </Grid>
        </div>
      );
}

export default Home;