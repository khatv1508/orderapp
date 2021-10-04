import * as React from 'react';
import {
    Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { snackBarSlice } from "../../store/slices/snack-bar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBar() {
    const {isOpen, severity, message } = useSelector((state) => state.snackBar);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(snackBarSlice.actions.setOpen(0));
        dispatch(snackBarSlice.actions.setContent({severity: "info", message: ""}));
    };

    return (
        <Snackbar open={Boolean(isOpen)} autoHideDuration={3000} onClose={handleClose} 
            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>
    );
}

export default SnackBar;