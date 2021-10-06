import "./table.css";
import React from "react";
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
import { useSelector, useDispatch } from 'react-redux';
import { tableFormSlice} from "../../store/slices/table-form";
import RefreshBtn from "../../components/refresh-btn/refresh";
import { SiAirtable } from "react-icons/si";
import { fetchAllTable } from "../../store/thunk/thunk-table";

function TableManagement() {
  const {list_table} = useSelector((state) => state.tableForm);
  const dispatch = useDispatch();

  const [tables, setTables] = React.useState(list_table);

  React.useEffect(() => {
    setTables(list_table);
  }, [list_table]);

  const addHandleClick = (table) => {
    dispatch(tableFormSlice.actions.setAddTable(1));
    dispatch(tableFormSlice.actions.setTable(table));
  }

  const deleteHandleClick = (table) => {
    dispatch(tableFormSlice.actions.setDeleteTable(1));
    dispatch(tableFormSlice.actions.setTable(table));
  }

  const onFetchAllTable = () => {
    dispatch(fetchAllTable());
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
          <RefreshBtn onHandleClick={onFetchAllTable}/>
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
                {tables && tables.map((table, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{table.table_id}</TableCell>
                      <TableCell align="center">{table.table_number}</TableCell>
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