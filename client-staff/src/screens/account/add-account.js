import React from "react";
import {
    Button, 
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    Select,
    MenuItem,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    Stack,
    IconButton
}from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { accountFormSlice } from "../../store/slices/account-form";
import { Form, Field } from 'react-final-form';
import generator from 'generate-password';
import { BiCopy } from 'react-icons/bi';
import { snackBarSlice } from "../../store/slices/snack-bar";
import { copyToClipboard } from "../../common/copyToClipBoard";

function AddForm() {
    const {add_form, account} = useSelector((state) => state.accountForm);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(accountFormSlice.actions.setAddForm({open: 0, type: ""}));
        dispatch(accountFormSlice.actions.setAccount(undefined));
    };

    // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const onSubmit = async (values) => {
        // await sleep(300);
        // window.alert(JSON.stringify(values, 0, 2));

        // TODO: Call API
        dispatch(snackBarSlice.actions.setOpen(1));
        dispatch(snackBarSlice.actions.setContent({severity: "success", message: "Success!"}));

        handleClose();
    };

    const handleCopyToClipBoard = () => {
        copyToClipboard(pass);
        dispatch(snackBarSlice.actions.setOpen(1));
        dispatch(snackBarSlice.actions.setContent({severity: "success", message: "Coppied!"}));
    }

    const pass = generator.generate({
        length: 10,
        numbers: true
    });

    const formData = account ? {
        id: account.id,
        name: account.name,
        role: account.role_id,
        status: account.status
    } : {
        id: undefined,
        password: pass,
        role: 0,
        status: 1,
    };

    return (
        <div>
            <Dialog open={Boolean(add_form.open)} onClose={handleClose}>
                <DialogTitle>{add_form.type === "add" ? "Add" : "Edit"} Account</DialogTitle>
                <DialogContent>
                    <Form
                        onSubmit={onSubmit}
                        initialValues={{ ...formData }}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit} style={{minWidth: '300px'}}>
                                <Field name="name">
                                    {props => (
                                        <div>
                                            <FormControl fullWidth margin="normal">
                                                <FormLabel component="legend">Name</FormLabel>
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
                                {!account && <Field name="password">
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
                                                    <IconButton style={{width: '55px'}} onClick={handleCopyToClipBoard}><BiCopy /></IconButton>
                                                </Stack>
                                            </FormControl>
                                        </div>
                                    )}
                                </Field>}
                                <Field name="role">
                                    {props => (
                                        <div>
                                            <FormControl fullWidth margin="normal">
                                                <FormLabel component="legend">Role</FormLabel>
                                                <Select id="role"
                                                    name={props.input.name}
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                >
                                                    <MenuItem value={0}>Please select...</MenuItem>
                                                    <MenuItem value={1}>Admin</MenuItem>
                                                    <MenuItem value={2}>Nhân Viên</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    )}
                                </Field>
                                <Field name="status">
                                    {props => (
                                        <div>
                                            <FormControl component="fieldset" fullWidth margin="normal">
                                                <FormLabel component="legend">Status</FormLabel>
                                                <RadioGroup row aria-label="status" 
                                                    name={props.input.name}
                                                    onChange={props.input.onChange}
                                                >
                                                    <FormControlLabel value={1} control={<Radio checked={parseInt(values.status) === 1}/>} label="Active" />
                                                    <FormControlLabel value={0} control={<Radio checked={parseInt(values.status) === 0}/>} label="Inactive" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}
                                </Field>

                                <pre>{JSON.stringify(values, 0, 2)}</pre>

                                <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ p: 1 }}> 
                                    <Button variant="outlined" type="submit" disabled={submitting || pristine} >Apply</Button>
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

export default AddForm;