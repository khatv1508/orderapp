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
import { fetchDeleteMenu, fetchAllMenu } from "../../store/thunk/thunk-menu";

function DeleteMenu() {
    const {delete_menu, menu} = useSelector((state) => state.menuForm);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(menuFormSlice.actions.setDeleteMenu(0));
        dispatch(menuFormSlice.actions.setMenu(undefined));
    };

    const handleApply = () => {
      dispatch(fetchDeleteMenu(menu.id));
      handleClose();
      dispatch(fetchAllMenu());
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
            Do you want to delete "{menu && menu.food_name}" ?
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