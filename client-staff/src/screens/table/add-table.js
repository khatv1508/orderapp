import * as React from 'react';
import {
    Button, 
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
}from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { tableFormSlice} from "../../store/slices/table-form";

function AddTable() {
  const {add_table} = useSelector((state) => state.tableForm);
    const dispatch = useDispatch();


    const handleClose = () => {
        dispatch(tableFormSlice.actions.setAddTable(0));
    };

  return (
    <div>
      <Dialog open={Boolean(add_table)} onClose={handleClose}>
        <DialogTitle>Add Table</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="table"
            label="Table Number"
            type="integer"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Apply</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTable;