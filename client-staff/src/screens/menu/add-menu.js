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
    FormControl
}from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { menuFormSlice } from "../../store/slices/menu-form";

function AddMenu() {
    const {add_menu, menu} = useSelector((state) => state.menuForm);
    const dispatch = useDispatch();

    const [selectValue, setSelectValue] = React.useState(menu ? menu.type_id : 0);

    const handleClose = () => {
        dispatch(menuFormSlice.actions.setAddMenu({open: 0, type: ""}));
        dispatch(menuFormSlice.actions.setMenu({}));
        console.log(selectValue);    
    };

    const handleChange = (event) => {
        console.log(event.target.value);
        setSelectValue(event.target.value);
    };

    return (
        <div>
            <Dialog open={Boolean(add_menu.open)} onClose={handleClose}>
                <DialogTitle>{add_menu.type === "add" ? "Add" : "Edit"} Menu</DialogTitle>
                <DialogContent>
                    <TextField style={{margin: "15px 0"}}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="string"
                        fullWidth
                        variant="outlined"
                        value={menu ? menu.name : ""}
                    />
                    <TextField style={{margin: "15px 0"}}
                        margin="dense"
                        id="price"
                        label="Price"
                        type="double"
                        fullWidth
                        variant="outlined"
                        value={menu ? menu.price : ""}
                    />
                    <TextField style={{margin: "15px 0"}}
                        margin="dense"
                        id="iamge"
                        label="Image"
                        type="string"
                        fullWidth
                        variant="outlined"
                        value={menu ? menu.imageUrl : ""}
                    />
                    <FormControl fullWidth style={{margin: "15px 0"}}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            id="type"
                            value={0}
                            label="Type"
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Please select...</MenuItem>
                            <MenuItem value={1}>Món ăn</MenuItem>
                            <MenuItem value={2}>Đồ uống</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Apply</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
  );
}

export default AddMenu;