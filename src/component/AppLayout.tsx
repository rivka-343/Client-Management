import { Outlet } from "react-router"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import NavBar from './NavBar';
import Headers from "./header";
const AppLayout = () => {
    return (<>
   <Box sx={{ flexGrow: 1}}>
        <AppBar position="fixed">
            <Toolbar >
                <Headers/>
                <NavBar/>
            </Toolbar>
        </AppBar>
        <Box  sx={{  mt: 8, overflowY: 'auto',height: 'calc(100vh - 64px)'}}>
            <Outlet />
        </Box>
    </Box>
    </>)
}
export default AppLayout