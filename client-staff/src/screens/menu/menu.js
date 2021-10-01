import "./menu.css";
import {
    Table,
    TableBody, 
    TableCell,
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    IconButton,
    Button
}from '@mui/material';
import RefreshBtn from "../../components/refresh-btn/refresh";
import { RiMenuAddFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdDelete} from "react-icons/md";
import { useDispatch } from 'react-redux';
import { menuFormSlice } from "../../store/slices/menu-form";
import AddMenu from "./add-menu";
import DeleteMenu from "./delete-menu";

const menus = [{
  id: 1,
  type_id: 1,
  type_name: "Món ăn",
  name: "Combo thăn vai bò Mỹ",
  price: 50000,
  imageUrl: ""
},
{
  id: 2,
  type_id: 1,
  type_name: "Món ăn",
  name: "Combo ba chỉ bò Mỹ",
  price: 50000,
  imageUrl: ""
},
{
  id: 3,
  type_id: 1,
  type_name: "Món ăn",
  name: "Sumo Special Course",
  price: 50000,
  imageUrl: ""
}];

function Menu() {

  const dispatch = useDispatch();

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

  return (
    <div>
      {/* form dialog */}
      <AddMenu />
      <DeleteMenu />
      <div className="meun-top" style={{}}>
        <h2>Menu</h2>
        <div>
          <Button variant="outlined" onClick={addHandleClick} 
            startIcon={<RiMenuAddFill style={{width: "23px", height: "23px"}}/>}>
            <span style={{fontSize: "18px"}}>Add</span>
          </Button>
          <RefreshBtn />
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
            {menus.map((menu, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center">{menu.id}</TableCell>
                  <TableCell align="center">{menu.type_name}</TableCell>
                  <TableCell align="center">{menu.name}</TableCell>
                  <TableCell align="center">{menu.price}</TableCell>
                  <TableCell align="center">{menu.imageUrl}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => editHandleClick(menu)}><BiEdit /></IconButton>
                    <IconButton onClick={() => deleteHandleClick(menu)}><MdDelete /></IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );    
}

export default Menu;