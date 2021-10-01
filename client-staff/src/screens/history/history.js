import HistoryOrder from '../../components/order/order';
import {
    Grid,
} from '@mui/material';
import './history.css';
import RefreshBtn from "../../components/refresh-btn/refresh";

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
    date: "25-09-2021 18:00 PM",
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
  },
  {
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
    date: "25-09-2021 18:00 PM",
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
    status: 0
  },
  {
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
  }];

const History = () => {
    const refreshHistory = () => {
        console.log("reload history order");
      }
    return (
        <div>
            <Grid container item lg={12}>
                <Grid item lg={12} 
                style={{margin: "0 25px", display: "flex", justifyContent: "space-between", padding: "5px 0"}}>
                    <h2 className="title">History Order</h2>
                    <RefreshBtn onHandleClick={refreshHistory}/>
                </Grid>
            </Grid>
            <div className="history-order">
                <Grid container spacing={3} item lg={12} >
                {orders.map((order, index) => {
                    return <Grid key={index} item lg={3}>
                        <HistoryOrder order={order}/>
                    </Grid>
                })}
                </Grid>
            </div>
        </div>
    )
}

export default History;