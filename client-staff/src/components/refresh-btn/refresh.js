import { RiRefreshLine } from "react-icons/ri";
import {
    IconButton
} from '@mui/material';

function RefreshBtn ({onHandleClick}) {
    return (
        <IconButton onClick={onHandleClick}>
            <RiRefreshLine style={{padding: "5px", fontSize: "25px"}}/> 
        </IconButton>
    )
}

export default RefreshBtn;
