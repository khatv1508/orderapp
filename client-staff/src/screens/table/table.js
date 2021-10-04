import "./table.css";
import {
    Table,
    TableBody, 
    TableCell,
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    IconButton,
    Button
}from '@mui/material';
import AddTable from "./add-table";
import DeleteTable from "./delete-table";
import { MdDelete} from "react-icons/md";
import { useDispatch } from 'react-redux';
import { tableFormSlice} from "../../store/slices/table-form";
import RefreshBtn from "../../components/refresh-btn/refresh";
import { RiMenuAddFill } from "react-icons/ri";


function TableManagement() {

  const dispatch = useDispatch();

  const addHandleClick = () => {
    dispatch(tableFormSlice.actions.setAddTable(1));
  }

  const deleteHandleClick = () => {
    dispatch(tableFormSlice.actions.setDeleteTable(1));
    // dispatch(tableFormSlice.actions.setTable(table));
  }

  return (
    <div>
      {/* form dialog */}
      <AddTable />
      <DeleteTable />
      <div className="table-top">
        <h2>Table</h2>
        <div>
          <Button variant="outlined" onClick={addHandleClick} 
            startIcon={<RiMenuAddFill style={{width: "23px", height: "23px"}}/>}>
            <span style={{fontSize: "18px"}}>Add</span>
          </Button>
          <RefreshBtn />
        </div>
      </div>
        
      <div style={{padding: "0 20px"}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{background: "#B4DAE0"}}>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Table Number</TableCell>
                  <TableCell align="center">Tools</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell align="center">1</TableCell>
                    <TableCell align="center">1</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={deleteHandleClick}><MdDelete /></IconButton>
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
      </div>
      
    </div>
  );    
}

export default TableManagement;