import {useContext, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Avatar1 from './Avatar';
import LoginT from './LoginT';
import { AuthContext } from '../type';
const Headers = () => {
  const [login, setLogin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const {user ,dispatch} = useContext(AuthContext);
 
  const handleShowForm = () => {    
    setShowForm(true);
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setShowForm(false); // מבטיח שהטופס לא יוצג מיד אחרי היציאה
};
  return (
    <>
          <Box>
          {!user && (    <Button variant="contained" onClick={() => handleShowForm()} sx={{ marginRight: 2 }}>
              Login
            </Button>)}
          </Box>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {showForm && !user && <LoginT setLogin={setLogin} prev={login}/>}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
            <Avatar1 />
          </Box>
        )}
        </Typography>

       
    </>
  );
};
export default Headers;




 




