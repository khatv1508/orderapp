import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText
}from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { menuFormSlice } from "../../store/slices/menu-form";

function DeleteMenu() {
    const {delete_menu, menu} = useSelector((state) => state.menuForm);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(menuFormSlice.actions.setDeleteMenu(0));
        dispatch(menuFormSlice.actions.setMenu({}));
    };

  return (
    <div>
      <Dialog
        open={Boolean(delete_menu)} onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Message
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete "{menu.name}" account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Apply</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteMenu;