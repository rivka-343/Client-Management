import { useContext, useState, FormEvent } from 'react';
import axios from 'axios';
import { TextField, Button, InputAdornment, IconButton, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../type';

const LoginT = ({ setLogin, prev }: { setLogin: Function, prev: boolean }) => {
    const { dispatch } = useContext(AuthContext);
    const [UserName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!(prev));
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let baseUrl = import.meta.env.VITE_BASE_URL;// קבלת ה-BASE URL מ-env
        try {
            console.log(baseUrl);
            const res = await axios.post(`${baseUrl}/Auth/login`, {
                userName: UserName,
                password: password
            });  
            console.log(await res);
                      
            // עדכון ה-Context וה-token
            dispatch({ type: "LOGIN", data: { user: res.data.user, token: res.data.token } });
            sessionStorage.setItem("token", res.data.token);
            setLogin(!(prev));
            setError('');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {                    
                        alert("יש בעיה בפרטי המשתמש, נא לבדוק את שם המשתמש והסיסמה.");
                        setError('');
                }
            } else {
                alert('שגיאה בלתי צפויה, אנא נסה מאוחר יותר');
                setError('An unexpected error occurred');
            }
        }
        setUserName('');
        setPassword('');
    };
    return (
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" variant="contained" color="primary">
                   Login
                </Button>
            </Box>
        </form>
    );
};
export default LoginT;