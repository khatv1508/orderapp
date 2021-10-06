import React from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    DialogActions
}from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { tableFormSlice } from "../../store/slices/table-form";
import { fetchDeleteTable, fetchAllTable } from "../../store/thunk/thunk-table";

function DeleteMenu() {
  const {delete_table, table} = useSelector((state) => state.tableForm);
  const dispatch = useDispatch();

  const handleClose = () => {
      dispatch(tableFormSlice.actions.setDeleteTable(0));
      dispatch(tableFormSlice.actions.setTable(undefined));
  };

  const handleApply = () => {
    dispatch(fetchDeleteTable(table.table_id));
    handleClose();
    dispatch(fetchAllTable());
  };
  return (
    <div>
      <Dialog
        open={Boolean(delete_table)} onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Message
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete Table "{table && table.table_number}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApply}>Apply</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteMenu;