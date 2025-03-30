import {  useContext } from "react";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import { Avatar } from "@mui/material";
import {  AuthContext } from "../type";
const Avatar1 = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <Box
            //  position: 'absolute', top: 0, left: 0, p: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, 
                sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1,}}>
                <Avatar sx={{ backgroundColor: '#f0f0f0',color: blue[500],}}>
                    {/* {(user?.firstName ? user.firstName.charAt(0) : user?.email ? user?.email .charAt(0):"") + (user?.lastName ? user.lastName.charAt(0) : '')} */}
                    </Avatar>
                <label>{(user?.role ? user?.role:"")+ " " +(user?.idNumber ? user?.idNumber:" " )  }</label>
                {/* <Button variant="contained" onClick={showModal}>edit <Edit /></Button> */}
            </Box>
        </>
    );
};
export default Avatar1;