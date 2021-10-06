import * as React from 'react';
import {
    Button, 
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    Stack
}from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { tableFormSlice} from "../../store/slices/table-form";
import {Form, Field} from 'react-final-form';
import { fetchAddTable } from "../../store/thunk/thunk-table";

function AddTable() {
  const {add_table} = useSelector((state) => state.tableForm);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(tableFormSlice.actions.setAddTable(0));
    dispatch(tableFormSlice.actions.setTable(undefined));
  };

  const onSubmit = async (values) => {
    values.table_number && dispatch(fetchAddTable(values.table_number));
    handleClose();
  }

  const formData = {
      table_id: undefined,
      table_number: undefined
  };

  return (
    <div>
      <Dialog open={Boolean(add_table)} onClose={handleClose}>
        <DialogTitle>Add Table</DialogTitle>
        <DialogContent>
          <Form
            onSubmit={onSubmit}
            initialValues={{ ...formData }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} style={{minWidth: '300px'}}>
                <Field name="table_number">
                  {props => (
                    <div>
                      <FormControl fullWidth margin="normal">
                        <FormLabel component="legend">Number</FormLabel>
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

export default AddTable;