import React from 'react';
import ImageUploading from 'react-images-uploading';
import {
    Button, 
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    Stack
}from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { menuFormSlice } from "../../store/slices/menu-form";
import { snackBarSlice } from "../../store/slices/snack-bar";
import { Form, Field } from 'react-final-form';

function ImageMenu() {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const {image_menu, menu} = useSelector((state) => state.menuForm);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(menuFormSlice.actions.setImageMenu(0));
        dispatch(menuFormSlice.actions.setMenu(undefined));
        // console.log(selectValue); 
        setImages([]);   
    };

    const onSubmit = async (values) => {
        // await sleep(300);
        window.alert(JSON.stringify(menu));

        // TODO: Call API
        dispatch(snackBarSlice.actions.setOpen(1));
        dispatch(snackBarSlice.actions.setContent({severity: "success", message: "Success!"}));

        handleClose();
    };

    return (
        <div>
            <Dialog open={Boolean(image_menu)} onClose={handleClose}>
                <DialogTitle>Add image</DialogTitle>
                <DialogContent>
                    <Form
                        onSubmit={onSubmit}
                        // initialValues={{ ...formData }}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit} style={{minWidth: '500px'}}>
                                <Field name="images">
                                    {props => (
                                        <div>
                                            <FormControl fullWidth margin="normal">
                                                <ImageUploading
                                                    multiple
                                                    value={images}
                                                    onChange={onChange}
                                                    maxNumber={maxNumber}
                                                    dataURLKey="data_url"
                                                    acceptType={['jpg', 'gif', 'png']}
                                                    inputProps={{name: props.input.name}}
                                                >
                                                    {({
                                                    imageList,
                                                    onImageUpload,
                                                    onImageRemoveAll,
                                                    onImageUpdate,
                                                    onImageRemove,
                                                    dragProps
                                                    }) => (
                                                    <div className="upload__image-wrapper">
                                                        <Button
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                        >
                                                        Choose images
                                                        </Button>
                                                        <Button onClick={onImageRemoveAll}>Remove all images</Button>
                                                        {imageList.map((image, index) => (
                                                            <div key={index}>
                                                                <img src={image['data_url']} alt="" width="200px"/>
                                                                <div>
                                                                <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                                                <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    )}
                                                </ImageUploading>
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

export default ImageMenu;