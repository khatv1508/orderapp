import React from "react";
import "./menu.css";
import logo from "../../assets/image/logo.png"
import user from "../../assets/image/user.png";
// import staff from "../../assets/image/staff.png";
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar
} from '@mui/material';
import { AiFillHome } from "react-icons/ai";
import { RiAccountCircleLine, RiHistoryFill } from "react-icons/ri";
import { MdRestaurantMenu } from "react-icons/md";
import { SiAirtable } from "react-icons/si";
import { CgLogOut} from "react-icons/cg";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { menuSlice } from "../../store/slices/menu";

const menus = [{
    id: "home",
    label: "Home",
    url: "/app",
    icon: <AiFillHome />
},{
    id: "history",
    label: "History",
    url: "/app/history",
    icon: <RiHistoryFill />
},{
    id: "account",
    label: "Account",
    url: "/app/account",
    icon: <RiAccountCircleLine />
},{
    id: "menu",
    label: "Menu",
    url: "/app/menu",
    icon: <MdRestaurantMenu />
},{
    id: "table",
    label: "Table",
    url: "/app/table",
    icon: <SiAirtable />
}];

const MenuItem = ({menu}) => {
    const activeMenu = useSelector((state) => state.menu.active_menu);
    const dispatch = useDispatch();

    let history = useHistory();
    const [isActive, setIsActive] = React.useState(activeMenu === menu.id);

    React.useEffect(() => {
        setIsActive(activeMenu === menu.id);
    }, [activeMenu, menu.id]);

    const handleMenuClick = () => {
        // set menu active 
        dispatch(menuSlice.actions.setActiveMenu(menu.id));
        // set isActive
        setIsActive(true);
        // push history
        history.push(menu.url);
    }

    return (
        <ListItemButton onClick={handleMenuClick}>
            <ListItemIcon style={{zIndex: 10}}>
                {menu.icon}
            </ListItemIcon>
            {isActive && <div className="btn-hover"></div>}
            <ListItemText primary={menu.label} />
        </ListItemButton>
    );
}

const Menu = () => {
    return (
        <div className="menu">
            <div className="menu-top">
                <img className="menu-logo" src={logo} alt="logo"/>
                <div className="menu-avatar">
                    <Avatar className="avatar" alt="" src={user} />
                    <p>Hello, Admin</p>
                    {/* <Avatar className="avatar" alt="" src={staff} /> */}
                </div>
                
                <List className="list">
                    {menus.map((menu) => {
                        return <MenuItem key={menu.url} menu={menu}/>
                    })}
                </List>
            </div>
            
            <List className="list">
                <ListItemButton>
                    <ListItemIcon>
                        <CgLogOut />
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/login">Log Out</Link>} />
                </ListItemButton>
            </List>
        </div>
    );
}

export default Menu;