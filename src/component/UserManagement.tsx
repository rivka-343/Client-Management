import { useState } from 'react';
import {  Button } from '@mui/material';

import Register from './Register';
const UserManagement = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [registerPermission, setRegisterPermission] = useState<string | null>(null);
    const handleCloseRegister = () => {
        setShowRegister(false);
        setRegisterPermission(null);
    };

return (
<>
<Button color="inherit" variant="contained" onClick={() => {
            console.log("try add manager");
            setRegisterPermission("Manager");
            setShowRegister(true);
        }}>Add New Manager</Button>
        
        <Button color="inherit" variant="contained" onClick={() => {
            setRegisterPermission("Employee");
            setShowRegister(true);
        }}>Add New Employee</Button>

        {/* הצגת טופס הרישום בהתאם למצב */}
        {showRegister && registerPermission && (
            <Register permission={registerPermission} onClose={handleCloseRegister}/>
        )}</>
    );
};
export default UserManagement;