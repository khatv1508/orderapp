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
import AddAccount from "./add-account";
import ResetPass from "./reset-pass-form";
import DeleteAccount from "./delete-account";
import { useSelector, useDispatch } from 'react-redux';
import { accountFormSlice } from "../../store/slices/account-form";
import { fetchAllAccount, } from "../../store/thunk/thunk-account";

function Account() {
  const {list_account} = useSelector((state) => state.accountForm);
  const dispatch = useDispatch();

  const [accounts, setAccounts] = React.useState(list_account);

  React.useEffect(() => {
    setAccounts(list_account);
  }, [list_account]);

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

  const onfetchAllAccount = () => {
    dispatch(fetchAllAccount());
  }

  return (
    <div>
      {/* form dialog */}
      <AddAccount />
      <ResetPass />
      <DeleteAccount />

      <div className="account-top">
        <h2>Account</h2>
        <div className="account-btn">
        <Button variant="outlined" onClick={addHandleClick}
          startIcon={<IoMdPersonAdd style={{width: "23px", height: "23px"}}/> }>
            <span style={{fontSize: "18px"}}>Add</span>
        </Button>
        <RefreshBtn onHandleClick={onfetchAllAccount}/>
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
              {accounts && accounts.map((account, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{account.id}</TableCell>
                      <TableCell align="center">{account.role.role_id}</TableCell>
                      <TableCell align="center">{account.account_name}</TableCell>
                      <TableCell align="center">{account.create_date}</TableCell>
                      <TableCell align="center">{account.update_date}</TableCell>
                      <TableCell align="center">
                        <Switch checked={Boolean(account.account_status)} disabled/>
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