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
import { SiAirtable } from "react-icons/si";

const tables = [{
  id: 1,
  number: 1
},
{
  id: 2,
  number: 2
},
{
  id: 3,
  number: 3
},
{
  id: 4,
  number: 4
}
];

function TableManagement() {

  const dispatch = useDispatch();

  const addHandleClick = (table) => {
    dispatch(tableFormSlice.actions.setAddTable(1));
    dispatch(tableFormSlice.actions.setTable(table));
  }

  const deleteHandleClick = (table) => {
    dispatch(tableFormSlice.actions.setDeleteTable(1));
    dispatch(tableFormSlice.actions.setTable(table));
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
            startIcon={<SiAirtable style={{width: "23px", height: "23px"}}/>}>
            <span style={{fontSize: "18px"}}>Add</span>
          </Button>
          <RefreshBtn />
        </div>
      </div>
        
      <div style={{padding: "0 20px"}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{background: "#B4DAE0"}}>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Table Number</TableCell>
                  <TableCell align="center">Tools</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tables.map((table, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{table.id}</TableCell>
                      <TableCell align="center">{table.number}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => deleteHandleClick(table)}><MdDelete /></IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
      </div>
      
    </div>
  );    
}

export default TableManagement;