import React from "react";
import {
    Button, 
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Switch,
    FormGroup,
    FormControlLabel
}from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { accountFormSlice } from "../../store/slices/account-form";

function AddForm() {
    const {add_form, account} = useSelector((state) => state.accountForm);
    const dispatch = useDispatch();

    const [role, setRole] = React.useState(0);

    console.log(role, account);
    const handleChange = (event) => {
        
        setRole(event.target.value);
      };

    const handleClose = () => {
        dispatch(accountFormSlice.actions.setAddForm({open: 0, type: ""}));
        dispatch(accountFormSlice.actions.setAccount(undefined));
    };

    return (
        <div>
            <Dialog open={Boolean(add_form.open)} onClose={handleClose}>
                <DialogTitle>{add_form.type === "add" ? "Add" : "Edit"} Account</DialogTitle>
                <DialogContent>
                    {/* <TextField style={{margin: "15px 0"}}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="string"
                        fullWidth
                        variant="outlined"
                        value={account ? account.name : ""}
                    />
                    {add_form.type === "add" && 
                        <TextField style={{margin: "15px 0"}}
                            margin="dense"
                            id="pass"
                            label="Password"
                            type="string"
                            fullWidth
                            variant="outlined"
                        />
                    }
                    <FormControl fullWidth style={{margin: "15px 0"}}>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            id="role"
                            label="Role"
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Please select...</MenuItem>
                            <MenuItem value={1}>Admin</MenuItem>
                            <MenuItem value={2}>Nhân Viên</MenuItem>
                        </Select>
                    </FormControl>

                    <FormGroup >
                        <FormControlLabel 
                            control={<Switch defaultChecked={account ? Boolean(account.status) : false} />} 
                            label="Status"
                            labelPlacement="start"
                            style={{width: "100%", justifyContent: "flex-start !important"}}
                            />
                    </FormGroup> */}
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Apply</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
  );
}

export default AddForm;