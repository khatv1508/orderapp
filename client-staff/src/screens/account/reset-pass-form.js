import React from "react";
import {
    Button, 
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
}from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { accountFormSlice } from "../../store/slices/account-form";

function ResetForm() {
    const {reset_form, account} = useSelector((state) => state.accountForm);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(accountFormSlice.actions.setResetForm(0));
        dispatch(accountFormSlice.actions.setAccount({}));
    };

    return (
        <div>
            <Dialog open={Boolean(reset_form)} onClose={handleClose}>
                <DialogTitle>Reset Password for "{account && account.name}"</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="old-pass"
                        label="Old Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="new-pass"
                        label="New Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="confirm-pass"
                        label="Confirm Password"
                        type="password"
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

export default ResetForm;