import React from "react";
import {
    Button, 
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    Stack,
    IconButton
}from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { accountFormSlice } from "../../store/slices/account-form";
import { snackBarSlice } from "../../store/slices/snack-bar";
import { Form, Field } from 'react-final-form'
import { BiCopy } from 'react-icons/bi';
import generator from 'generate-password';
import { copyToClipboard } from "../../common/copyToClipBoard";

const ResetAdmin = () => {
    return (
        <div>
            <Field name="old-pass">
                {props => (
                    <div>
                        <FormControl fullWidth margin="normal">
                            <FormLabel component="legend">Old Password</FormLabel>
                            <TextField
                                autoFocus
                                name={props.input.name}
                                value={props.input.value}
                                onChange={props.input.onChange}
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                    </div>
                )}
            </Field>
            <Field name="new-pass">
                {props => (
                    <div>
                        <FormControl fullWidth margin="normal">
                            <FormLabel component="legend">New Password</FormLabel>
                                <TextField
                                    name={props.input.name}
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                    fullWidth
                                />
                        </FormControl>
                    </div>
                )}
            </Field>
            <Field name="Confirm-pass">
                {props => (
                    <div>
                        <FormControl fullWidth margin="normal">
                            <FormLabel component="legend">Confirm Password</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name={props.input.name}
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                />
                        </FormControl>
                    </div>
                )}
            </Field>
        </div>
        
    )
}

const ResetAccount = ({copyClipBoard}) => {
    return (
        <div>
            <Field name="password">
                {props => (
                    <div>
                        <FormControl fullWidth margin="normal">
                            <FormLabel component="legend">Password</FormLabel>
                            <Stack spacing={1} direction="row" justifyContent="flex-end"> 
                                <TextField
                                    disabled
                                    name={props.input.name}
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                    fullWidth
                                />
                                <IconButton style={{width: '55px'}} onClick={copyClipBoard}><BiCopy /></IconButton>
                            </Stack>
                        </FormControl>
                    </div>
                )}
            </Field>
        </div>
    )
}

function ResetForm() {
    const {reset_form, account} = useSelector((state) => state.accountForm);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(accountFormSlice.actions.setResetForm(0));
        dispatch(accountFormSlice.actions.setAccount(undefined));
    };

    const onSubmit = async (values) => {

        // TODO: Call API
        dispatch(snackBarSlice.actions.setOpen(1));
        dispatch(snackBarSlice.actions.setContent({severity: "success", message: "error"}));

        handleClose();
    };

    const handleCopyToClipBoard = () => {
        copyToClipboard(pass);
        dispatch(snackBarSlice.actions.setOpen(1));
        dispatch(snackBarSlice.actions.setContent({severity: "success", message: "error"}));
    }

    const pass = generator.generate({
        length: 10,
        numbers: true
    });

    const formData = account ? account.role_id === 1 ? {
        id: account.id
    } : {
        id: account.id,
        password: pass,
    } : {
        id: undefined
    };

    return (
        <div>
            <Dialog open={Boolean(reset_form)} onClose={handleClose}>
                <DialogTitle>Reset Password for "{account && account.name}"</DialogTitle>
                <DialogContent>
                    <Form
                        onSubmit={onSubmit}
                        initialValues={{ ...formData }}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit} style={{minWidth: '300px'}}>
                                {account && account.role_id === 1 ? <ResetAdmin /> : <ResetAccount copyClipBoard={handleCopyToClipBoard}/>}
                                                                
                                <pre>{JSON.stringify(values, 0, 2)}</pre>

                                <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ p: 1 }}> 
                                    <Button variant="outlined" type="button" disabled={submitting} >Apply</Button>
                                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                                </Stack>
                            </form>
                        )}
                    />
                </DialogContent>
            </Dialog>
        </div>
  );
}

export default ResetForm;