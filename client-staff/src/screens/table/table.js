import "./table.css";
import {
    Table,
    TableBody, 
    TableCell,
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    IconButton
}from '@mui/material';
import AddTable from "./add-table";
import { MdDelete} from "react-icons/md";


function TableManagement() {
  return (
    <div>
      <div className="table-top">
        <h2>Table</h2>
        <AddTable />
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
                      <IconButton><MdDelete /></IconButton>
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