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
import { snackBarSlice } from "../../store/slices/snack-bar";

function DeleteMenu() {
  const {delete_table, table} = useSelector((state) => state.tableForm);
  const dispatch = useDispatch();

  const handleClose = () => {
      dispatch(tableFormSlice.actions.setDeleteTable(0));
      dispatch(tableFormSlice.actions.setTable(undefined));
  };

  const handleApply = () => {
    window.alert(JSON.stringify(table));
    // TODO: Call API
    dispatch(snackBarSlice.actions.setOpen(1));
    dispatch(snackBarSlice.actions.setContent({severity: "success", message: "Delete complete!"}));

    handleClose();
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
            Do you want to delete Table "{table && table.number}" ?
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