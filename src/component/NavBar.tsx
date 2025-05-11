// import { Link } from "react-router"
// import { useContext } from "react";
// import { AuthContext } from "../type";
// import Button from '@mui/material/Button';
// const NavBar = () => {

//     const { user } = useContext(AuthContext);
//     return (
//         <nav style={{ padding: '10px' }}>
//             {user?.role === 'Manager' &&
//                 (<Button color="inherit" variant="contained"><Link to='/user-management' > User management</Link></Button>)
//             }
//             {user && (<Button color="inherit" variant="contained"><Link to='/request' >Request</Link></Button> )}
//             <Button color="inherit" variant="contained"> <Link to='/' >Home</Link></Button>
//         </nav>
//     )
// }
// export default NavBar

import { Link } from "react-router-dom"; // Import from react-router-dom
import { useContext } from "react";
import { AuthContext } from "../type";
import Button from '@mui/material/Button';

const NavBar = () => {
    const { user } = useContext(AuthContext);

    return (
        <nav style={{ padding: '10px' }}>
            {user?.role === 'Manager' && (
                <Button color="inherit" variant="contained" style={{ marginRight: '10px' }}>
                    <Link to='/user-management' style={{ textDecoration: 'none', color: 'white' }}>User management</Link>
                </Button>
            )}
              {user?.role === 'Manager' && (
                <Button color="inherit" variant="contained" style={{ marginRight: '10px' }}>
                    <Link to='/settings' style={{ textDecoration: 'none', color: 'white' }}>settings</Link>
                </Button>
            )}
            {user && (
                <Button color="inherit" variant="contained" style={{ marginRight: '10px' }}>
                    <Link to='/resident' style={{ textDecoration: 'none', color: 'white' }}>residents</Link>
                </Button>
            )}
            {user && (
                <Button color="inherit" variant="contained" style={{ marginRight: '10px' }}>
                    <Link to='/request' style={{ textDecoration: 'none', color: 'white' }}>Request</Link>
                </Button>
            )}
            <Button color="inherit" variant="contained">
                <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
            </Button>
        </nav>
    );
};

export default NavBar;
    // const [showRegister, setShowRegister] = useState(false);
    // const [registerPermission, setRegisterPermission] = useState<string | null>(null);
    // const handleCloseRegister = () => {
    //     setShowRegister(false);
    //     setRegisterPermission(null);
    // };
{/* <Button color="inherit" variant="contained" onClick={() => {
                    dispatch({ type: "LOGOUT"});
                    }}>Logout</Button> */}
                    {/* <Button color="inherit" variant="contained" onClick={() => { }}>Edit Details</Button> */}
