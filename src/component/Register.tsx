import { useState, FormEvent } from 'react';
import axios from 'axios';
import { TextField, Button, InputAdornment, IconButton, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const Register = ({ permission, onClose }: { permission: string, onClose: () => void }) => {
    // const { dispatch,user } = useContext(AuthContext);
    const [UserName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!(showPassword));
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let baseUrl = process.env.REACT_APP_BASE_URL; // קבלת ה-BASE URL מ-env
       let token=sessionStorage.getItem("token");
        try {
            await axios.post( `${baseUrl}/Auth/register`, {
                userName: UserName,
                password: password,
                idNumber:idNumber,
                role:permission,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}` // הוספת ה-Token לכותרת
                }
            }
        );
            onClose(); // סוגר את הטופס אחרי השליחה בהצלחה    
            alert("add "+permission+" sucsesfoly!")        
            setError('');
        } catch (err) {
                alert('שגיאה בלתי צפויה, אנא נסה מאוחר יותר');
                setError('An unexpected error occurred');
            }
        setUserName('');
        setPassword('');
        setIdNumber('');
    };
    return (

        // <form onSubmit={actionType === 'register' ? handleNewUser : handleSubmit}>
        <form onSubmit={handleSubmit}>
            <Box sx={{
                display: 'flex', flexDirection: 'column',
                maxWidth: 400, margin: 'auto', padding: 2,
                border: '1px solid #ccc', borderRadius: '5px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, 50%)',
                height: 'fit-content',
                width: '100%', zIndex: 1, boxShadow: 3
            }}>
                <TextField label="UserName" type="text" variant="outlined" value={UserName} onChange={(e) => setUserName(e.target.value)}margin="normal" required/>
                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleTogglePasswordVisibility} edge="end" >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField label="idNumber" type="text" variant="outlined" value={idNumber} onChange={(e) => setIdNumber(e.target.value)}margin="normal" required/>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" variant="contained" color="primary">
                   Register new {permission}
                </Button>
            </Box>
        </form>
    );
};
export default Register;