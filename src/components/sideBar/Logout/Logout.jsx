import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import './Logout.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../store+slice/authSlice';

const AlertDialogDemo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login')
    }

    return (

    <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
            <button className="Button violet">Logout</button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="AlertDialogOverlay" />
            <AlertDialog.Content className="AlertDialogContent">
                <AlertDialog.Title className="AlertDialogTitle">Are you absolutely sure?</AlertDialog.Title>
                <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-start' }}>
                    <AlertDialog.Cancel asChild>
                        <button className="Button mauve">Cancel</button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button className="Button red" onClick={logoutHandler}>Yes, logout</button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
);
};
export default AlertDialogDemo;