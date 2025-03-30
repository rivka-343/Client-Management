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
    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post('https://server-property-tax.onrender.com/api/Auth/login', {
    //             userName: UserName,
    //             password: password
    //         }
    //         // ,{ withCredentials: true }
    //         );
    //         console.log(res);
    //         // dispatch({ type: 'LOGIN', data: res.data.user });
    //         dispatch({ type: "LOGIN", data: { user: res.data.user, token: res.data.token } });
    //         sessionStorage.setItem("token", res.data.token);
    //         setLogin(!(prev));
    //         setError('');
    //     } catch (err) {
    //         if (axios.isAxiosError(err)) {
    //             if (err.response && err.response.status === 401) {
    //                 setError(err.response.data.message); // שמירה של הודעת השגיאה
    //             } else {
    //                 setError('An unexpected error occurred');
    //             }
    //         }
    //     }
    //     setUserName('');
    //     setPassword('');
    //     // console.log("lllllllllllllllll");
    //     // console.log(user);
        
    // };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    let baseUrl = process.env.REACT_APP_BASE_URL; // קבלת ה-BASE URL מ-env

        e.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/Auth/login`, {
                userName: UserName,
                password: password
            });            
            // עדכון ה-Context וה-token
            dispatch({ type: "LOGIN", data: { user: res.data.user, token: res.data.token } });
            sessionStorage.setItem("token", res.data.token);
            setLogin(!(prev));
            setError('');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {                    
                    // if (err.response.status === 401) {
                    //     // במקרה של שגיאה 401 (לא מורשה) נסגור את הטופס ונראה הודעת שגיאה
                    //     alert(" משתמש לא מורשה.");
                    //     setLogin(false); // סגור את טופס ההתחברות
                    //     setError(''); // ניתן לאפס את השגיאה במקרה של סגירה
                    // } else
                    //  if (err.response.status === 400) {
                    //     // אם יש שגיאה בפרטי המשתמש, הדפס הודעה מתאימה
                    //     setError(''); // אפס את הודעת השגיאה אם יש בעיה בפרטים
                    // } else {
                        alert("יש בעיה בפרטי המשתמש, נא לבדוק את שם המשתמש והסיסמה.");
                        setError('');
                        // setError('An unexpected error occurred');
                    }
                //}
            } else {
                // טיפול בשגיאות שאינן קשורות ל-axios (למשל בעיות ברשת)
                alert('שגיאה בלתי צפויה, אנא נסה מאוחר יותר');
                setError('An unexpected error occurred');
            }
        }
        setUserName('');
        setPassword('');
    };
    
  
    // const handleNewUser = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post('http://localhost:3000/api/user/register', {
    //             email: email,
    //             password: password
    //         });
    //         dispatch({ type: 'ADD_USER', data: { ...res.data.user } });
    //         setLogin(!(prev));

    //     } catch (err) {
    //         if (axios.isAxiosError(err)) {
    //             if (err.response && err.response.status === 400) {
    //                 setError(err.response.data.message);
    //             } else {
    //                 setError('An unexpected error occurred');
    //             }
    //         }
    //     }
    //     setEmail('');
    //     setPassword('');
    // };
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" variant="contained" color="primary">
                   Login
                   {/* {actionType === 'register' ? 'Register' : 'Login'} */}
                </Button>
            </Box>
        </form>
    );
};
export default LoginT;