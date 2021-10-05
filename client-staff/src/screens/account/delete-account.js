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
import { accountFormSlice } from "../../store/slices/account-form";
import { snackBarSlice } from "../../store/slices/snack-bar";

function DeleteAccount() {
  const {delete_account, account} = useSelector((state) => state.accountForm);
  const dispatch = useDispatch();

  const handleClose = () => {
      dispatch(accountFormSlice.actions.setDeleteAccount(0));
      dispatch(accountFormSlice.actions.setAccount(undefined));
  };

  const handleApply = () => {
    // await sleep(300);
    window.alert(JSON.stringify(account));

    // TODO: Call API
    dispatch(snackBarSlice.actions.setOpen(1));
    dispatch(snackBarSlice.actions.setContent({severity: "success", message: "Delete complete!"}));

    handleClose();
  };

  return (
    <div>
      <Dialog
        open={Boolean(delete_account)} onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Message
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete "{account && account.name}" account?
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

export default DeleteAccount;