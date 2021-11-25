import React from 'react';
import ImageUploading from 'react-images-uploading';
import {
    Button, 
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Stack,
}from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { menuFormSlice } from "../../store/slices/menu-form";
import { snackBarSlice } from "../../store/slices/snack-bar";
import { RiImageAddFill } from "react-icons/ri";
import NoImage from "../../assets/image/no-image.png";
import { fetchUpdateImageMenu } from "../../store/thunk/thunk-menu";

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
        setImages([]);   
    };

    const onSubmit = async () => {
        dispatch(fetchUpdateImageMenu({
            id: menu.id,
            image: images.length === 0 ? "" : images[0].data_url
        }));
        handleClose();
    };

    React.useEffect(() => {
        if (menu && menu.image) {
            setImages([{
                data_url: menu.image,
                file: []
            }]);
        }
        return;
        // eslint-disable-next-line
    }, [menu]);

    return (
        <div>
            <Dialog open={Boolean(image_menu)} onClose={handleClose}>
                <DialogTitle>Image Management</DialogTitle>
                <DialogContent>
                <ImageUploading
                    multiple={false}
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    maxFileSize={71000}
                    onError={() => {
                        dispatch(snackBarSlice.actions.setSnackBar({severity: "error", message: "File size is too large !"}));
                    }}
                    acceptType={['jpg', 'gif', 'png']}
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
                        <Stack spacing={2} direction="row" justifyContent="center" sx={{ p: 1 }}> 
                            <Button onClick={onImageUpload} {...dragProps} startIcon={<RiImageAddFill />}>Choose images</Button>
                            {/* <Button onClick={onImageRemoveAll} startIcon={<RiDeleteBin2Line />}>Remove</Button> */}
                        </Stack>
                        <Box mt={1} sx={{
                            p: 2, 
                            border: '1px dashed tomato', 
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap'
                        }}>
                            {imageList.length > 0 ? imageList.map((image, index) => (
                                <Stack key={index} 
                                    spacing={1} 
                                    direction="column" 
                                    justifyContent="center" 
                                    sx={{ p: 2, width: '100%' }}
                                >
                                    <img src={image.data_url} alt="" width="100%"/>
                                    <Stack direction="row" justifyContent="center">
                                        <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                        <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                    </Stack>
                                </Stack>
                            )) : <img src={NoImage} alt="" width="100%"/>
                            }
                        </Box>
                    </div>
                    )}
                </ImageUploading>
                {/* <pre>{JSON.stringify(images, 0, 2)}</pre> */}
                </DialogContent>
                <DialogActions>
                    <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ p: 1 }}> 
                        <Button variant="outlined" onClick={onSubmit}>Apply</Button>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ImageMenu;