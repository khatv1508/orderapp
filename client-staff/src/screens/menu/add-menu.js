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
    Stack
}from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { menuFormSlice } from "../../store/slices/menu-form";
import { Form, Field } from 'react-final-form';
import { fetchAddMenu, fetchUpdateMenu } from "../../store/thunk/thunk-menu";

function AddMenu() {
    const {add_menu, menu} = useSelector((state) => state.menuForm);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(menuFormSlice.actions.setAddMenu({open: 0, type: ""}));
        dispatch(menuFormSlice.actions.setMenu(undefined));
    };
    
    const onSubmit = async (values) => {
        if (values.id) {
            dispatch(fetchUpdateMenu(values));
        } else {
            dispatch(fetchAddMenu(values));
        }
        handleClose();
    };

    const formData = menu ? {
        id: menu.id,
        food_name: menu.food_name,
        price: menu.price,
        image: menu.image,
        type_id: menu.type_id
    } : {
        id: undefined,
        food_name: undefined,
        price: undefined,
        image: "",
        type_id: 0,
    };

    return (
        <div>
            <Dialog open={Boolean(add_menu.open)} onClose={handleClose}>
                <DialogTitle>{add_menu.type === "add" ? "Add" : "Edit"} Menu</DialogTitle>
                <DialogContent>
                <Form
                    onSubmit={onSubmit}
                    initialValues={{ ...formData }}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} style={{minWidth: '300px'}}>
                            <Field name="food_name">
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
                            <Field name="price">
                                {props => (
                                    <div>
                                        <FormControl fullWidth margin="normal">
                                            <FormLabel component="legend">Price</FormLabel>
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
                            <Field name="type_id">
                                {props => (
                                    <div>
                                        <FormControl fullWidth margin="normal">
                                            <FormLabel component="legend">Type</FormLabel>
                                            <Select id="role"
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={props.input.onChange}
                                            >
                                                <MenuItem value={0}>Please select...</MenuItem>
                                                <MenuItem value={1}>Đồ ăn </MenuItem>
                                                <MenuItem value={2}>Nước uống</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                )}
                            </Field>

                            <pre>{JSON.stringify(values, 0, 2)}</pre>

                            <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ p: 1 }}> 
                                <Button variant="outlined" type="submit" disabled={submitting} >Apply</Button>
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

export default AddMenu;