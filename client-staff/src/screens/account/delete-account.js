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
import { fetchDeleteAccount, fetchAllAccount } from "../../store/thunk/thunk-account";

function DeleteAccount() {
  const {delete_account, account} = useSelector((state) => state.accountForm);
  const dispatch = useDispatch();

  const handleClose = () => {
      dispatch(accountFormSlice.actions.setDeleteAccount(0));
      dispatch(accountFormSlice.actions.setAccount(undefined));
  };

  const handleApply = () => {
    dispatch(fetchDeleteAccount(account.id));
    handleClose();
    dispatch(fetchAllAccount());
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
            Do you want to delete "{account && account.account_name}" account?
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