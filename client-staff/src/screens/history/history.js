import './history.css';
import React from "react";
import {
    Grid,
} from '@mui/material';
import RefreshBtn from "../../components/refresh-btn/refresh";
import HistoryOrder from '../../components/order/order';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTurn } from "../../store/thunk/thunk-history";
import ShowMore from "../../components/order/show_more";

const History = () => {

    const {list_turn} = useSelector((state) => state.historyForm);
    const dispatch = useDispatch();

    const [turns, setTurns] = React.useState(list_turn);

    React.useEffect(() => {
        setTurns(list_turn);
        dispatch(fetchAllTurn()); // eslint-disable-next-line
    }, [list_turn]);

    const refreshHistory = () => {
        dispatch(fetchAllTurn());
    }

    return (
        <div>
            <ShowMore />
            <Grid container item lg={12}>
                <Grid item lg={12} 
                style={{margin: "0 25px", display: "flex", justifyContent: "space-between", padding: "5px 0"}}>
                    <h2 className="title">History Order</h2>
                    <RefreshBtn onHandleClick={refreshHistory}/>
                </Grid>
            </Grid>
            <div className="history-order">
                <Grid container spacing={3} item lg={12} >
                {turns && turns.map((turn, index) => {
                    return <Grid key={index} item lg={3}>
                        <HistoryOrder order={turn}/>
                    </Grid>
                })}
                </Grid>
            </div>
        </div>
    )
}

export default History;