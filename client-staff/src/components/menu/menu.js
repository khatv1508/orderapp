import React from "react";
import "./menu.css";
import logo from "../../assets/image/logo.png"
import user from "../../assets/image/user.png";
import staff from "../../assets/image/staff.png";
import chef from "../../assets/image/chef.png";
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
import { accountFormSlice } from "../../store/slices/account-form";

const menus = [{
    id: "home",
    label: "Home",
    url: "/app",
    icon: <AiFillHome />,
    role_id: [1,2]
},{
    id: "history",
    label: "History",
    url: "/app/history",
    icon: <RiHistoryFill />,
    role_id: [1,2,3]
},{
    id: "account",
    label: "Account",
    url: "/app/account",
    icon: <RiAccountCircleLine />,
    role_id: [1]
},{
    id: "menu",
    label: "Menu",
    url: "/app/menu",
    icon: <MdRestaurantMenu />,
    role_id: [1]
},{
    id: "table",
    label: "Table",
    url: "/app/table",
    icon: <SiAirtable />,
    role_id: [1]
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
    const dispatch = useDispatch();
    const { account_login } = useSelector((state) => state.accountForm);

    const handleLogout = () => {
        dispatch(accountFormSlice.actions.setAccountLogin(undefined));
    }

    return (
        <div className="menu">
            <div className="menu-top">
                <img className="menu-logo" src={logo} alt="logo"/>
                <div className="menu-avatar">
                    {account_login.role_id === 1 
                    ? <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"}}>
                        <Avatar className="avatar" alt="" src={user} />
                        <p>Hello, Admin</p>
                    </div> 
                    : account_login.role_id === 2 
                    ? <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"}}>
                        <Avatar className="avatar" alt="" src={staff} />
                        <p>Hello, Staff</p>
                    </div> 
                    : <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"}}>
                        <Avatar className="avatar" alt="" src={chef} />
                        <p>Hello, Chef</p>
                    </div>
                    }
                    
                </div>
                
                <List className="list">
                    {menus.map((menu) => {
                        // if (menu.role_id && menu.role_id !== account_login.role_id) {
                        if (menu.role_id && !menu.role_id.includes(account_login.role_id)) {  
                            return <div key={menu.url}></div>
                        }
                        return <MenuItem key={menu.url} menu={menu}/>
                    })}
                </List>
            </div>
            
            <List className="list">
                <ListItemButton onClick={handleLogout}>
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