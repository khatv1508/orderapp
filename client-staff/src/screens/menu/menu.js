import "./menu.css";
import React from "react";
import {
    Table,
    TableBody, 
    TableCell,
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    IconButton,
    Button,
    Pagination,
    Stack
}from '@mui/material';
import RefreshBtn from "../../components/refresh-btn/refresh";
import { RiMenuAddFill, RiImageAddFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdDelete} from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { menuFormSlice } from "../../store/slices/menu-form";
import AddMenu from "./add-menu";
import DeleteMenu from "./delete-menu";
import ImageMenu from "./image-menu";
import NoImage from "../../assets/image/no-image.png";

import { fetchAllMenu, } from "../../store/thunk/thunk-menu";

function Menu() {

  const {list_menu, pagination} = useSelector((state) => state.menuForm);
  const dispatch = useDispatch();

  const [menus, setMenus] = React.useState(list_menu);

  React.useEffect(() => {
    setMenus(list_menu);
  }, [list_menu]);

  const [paginate, setPaginate] = React.useState(pagination);

  React.useEffect(() => {
    setPaginate(pagination);
  }, [pagination]);

  const addHandleClick = () => {
    dispatch(menuFormSlice.actions.setAddMenu({open: 1, type: "add"}));
  }

  const editHandleClick = (menu) => {
    dispatch(menuFormSlice.actions.setAddMenu({
      open: 1, 
      type: "edit"
    }));
    dispatch(menuFormSlice.actions.setMenu(menu));
  }

  const deleteHandleClick = (menu) => {
    dispatch(menuFormSlice.actions.setDeleteMenu(1));
    dispatch(menuFormSlice.actions.setMenu(menu));
  }

  const uploadHandleClick = (menu) => {
    dispatch(menuFormSlice.actions.setImageMenu(1));
    dispatch(menuFormSlice.actions.setMenu(menu));
  }

  const handleChangePage = (event, newPage) => {
    dispatch(fetchAllMenu(newPage, undefined));
  };

  const onHandleClick = () => {
    dispatch(fetchAllMenu());
  }

  return (
    <div>
      {/* form dialog */}
      <AddMenu />
      <DeleteMenu />
      <ImageMenu />
      <div className="meun-top" style={{}}>
        <h2>Menu</h2>
        <div>
          <Button variant="outlined" onClick={addHandleClick} 
            startIcon={<RiMenuAddFill style={{width: "23px", height: "23px"}}/>}>
            <span style={{fontSize: "18px"}}>Add</span>
          </Button>
          <RefreshBtn onHandleClick={onHandleClick}/>
        </div>
      </div>
        
      <div style={{padding: "0 20px"}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{background: "#B4DAE0"}}>
                <TableCell width="10%" align="center">Id</TableCell>
                <TableCell width="10%" align="center">Type</TableCell>
                <TableCell width="15%" align="center">Name</TableCell>
                <TableCell width="15%" align="center">Price</TableCell>
                <TableCell width="15%" align="center">Image</TableCell>
                <TableCell width="10%" align="center">Tools</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {menus && menus.map((menu, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center">{menu.id}</TableCell>
                  <TableCell align="center">{menu.type.type_name}</TableCell>
                  <TableCell align="center">{menu.food_name}</TableCell>
                  <TableCell align="center">{menu.price}</TableCell>
                  <TableCell align="center">
                    <img src={menu.image ? menu.image : NoImage} alt="" style={{width: "120px", height: "120px"}}/>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => uploadHandleClick(menu)}><RiImageAddFill /></IconButton>
                    <IconButton onClick={() => editHandleClick(menu)}><BiEdit /></IconButton>
                    <IconButton onClick={() => deleteHandleClick(menu)}><MdDelete /></IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack mt={2} spacing={3} justifyContent="center" alignItems="center" sx={{width: "100%"}}>
          <Paper sx={{padding: "10px", borderRadius: "10px"}}>
            <Pagination size="large" 
            count={paginate.totalPages ? paginate.totalPages : 1} 
            variant="outlined" 
            color="primary"
            page={paginate.currentPage ? paginate.currentPage : 1}
            onChange={handleChangePage}
            />
          </Paper>
        </Stack>
      </div>
    </div>
  );    
}

export default Menu;