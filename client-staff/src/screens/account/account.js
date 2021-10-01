import "./account.css";
import React from "react";
import {
    Table,
    TableBody, 
    TableCell,
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    Button,
    IconButton,
    Switch
}from '@mui/material';
import RefreshBtn from "../../components/refresh-btn/refresh";
import { IoMdPersonAdd } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { MdDelete, MdVpnKey } from "react-icons/md";
import AddForm from "./add-account";
import ResetForm from "./reset-pass-form";
import DeleteAccount from "./delete-account";
import { useDispatch } from 'react-redux';
import { accountFormSlice } from "../../store/slices/account-form";

const accounts = [{
  id: 1,
  role: "Admin",
  role_id: 1,
  name: "admin",
  create_date: "01-09-2021",
  update_date: "02-09-2021",
  status: 1
},
{
  id: 2,
  role: "Nhân viên",
  role_id: 2,
  name: "vinhkha.truong",
  create_date: "01-09-2021",
  update_date: "10-09-2021",
  status: 0
}
];

function Account() {
  const dispatch = useDispatch();

  const addHandleClick = () => {
    dispatch(accountFormSlice.actions.setAddForm({open: 1, type: "add"}));
  }

  const editHandleClick = (account) => {
    dispatch(accountFormSlice.actions.setAddForm({
      open: 1, 
      type: "edit"
    }));
    dispatch(accountFormSlice.actions.setAccount(account));
  }

  const resetHandleClick = (account) => {
    dispatch(accountFormSlice.actions.setResetForm(1));
    dispatch(accountFormSlice.actions.setAccount(account));
  }

  const deleteHandleClick = (account) => {
    dispatch(accountFormSlice.actions.setDeleteAccount(1));
    dispatch(accountFormSlice.actions.setAccount(account));
  }

  return (
    <div>
      {/* form dialog */}
      <AddForm />
      <ResetForm />
      <DeleteAccount />

      <div className="account-top">
        <h2>Account</h2>
        <div className="account-btn">
        <Button variant="outlined" onClick={addHandleClick}
          startIcon={<IoMdPersonAdd style={{width: "23px", height: "23px"}}/> }>
            <span style={{fontSize: "18px"}}>Add</span>
        </Button>
        <RefreshBtn />
        </div>
      </div>
      <div style={{padding: "0 20px"}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{background: "#B4DAE0"}}>
              <TableRow>
                <TableCell width="10%" align="center">Id</TableCell>
                <TableCell width="15%" align="center">Role</TableCell>
                <TableCell width="15%" align="center">Name</TableCell>
                <TableCell width="15%" align="center">Create Date</TableCell>
                <TableCell width="15%" align="center">Update Date</TableCell>
                <TableCell width="10%" align="center">Status</TableCell>
                <TableCell width="10%" align="center">Tools</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{account.id}</TableCell>
                      <TableCell align="center">{account.role}</TableCell>
                      <TableCell align="center">{account.name}</TableCell>
                      <TableCell align="center">{account.create_date}</TableCell>
                      <TableCell align="center">{account.update_date}</TableCell>
                      <TableCell align="center">
                        <Switch defaultChecked={Boolean(account.status)} />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => resetHandleClick(account)}><MdVpnKey /></IconButton>
                        <IconButton onClick={() => editHandleClick(account)}><BiEdit /></IconButton>
                        <IconButton onClick={() => deleteHandleClick(account)}><MdDelete /></IconButton>
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

export default Account;