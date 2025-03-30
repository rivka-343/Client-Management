
import { createContext, ReactNode, useReducer, useEffect } from "react";
import axios from "axios";

// **סוגי תפקידים**
export type Role = "Manager" | "Employee" | null;

// **מבנה המשתמש**
export type User = {
    id: number;
    username: string;
    idNumber: string;
    role: Role;
};
type State = {
    user: User | null;
    token: string | null;
};

// **אקשנים לניהול המשתמשים**
export type Action =
    | { type: "LOGIN"; data: { user: User; token: string } }
    | { type: "LOGOUT" }
    | { type: "REGISTER"; data: { user: User; token: string } }
    | { type: "UPDATE_USER"; data: Partial<User> };

const initialState: { user: User | null; token: string | null } = {
    user: null,
    token: sessionStorage.getItem("token") || null,
};

// **Reducer לניהול משתמשים**
const authReducer = (state: typeof initialState, action: Action)  : State => {
    switch (action.type) {
        case "LOGIN":
            sessionStorage.setItem("token", action.data.token);            
            return { user: action.data.user, token: action.data.token };
        case "LOGOUT":
            sessionStorage.removeItem("token");
            return { user: null, token: null };
        // case "UPDATE_USER":
        //     return state ? { ...state, ...action.data } : null;
        default:
            return state;
    }
};
//
const AuthContext = createContext<{
    user: User | null;
    token: string | null;
    dispatch: React.Dispatch<Action>;
}>({
    user: initialState.user,
    token: initialState.token,
    dispatch: () => null,
});

// **ספק גלובלי לכל האפליקציה**
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [state, dispatch] = useReducer(authReducer, initialState);
    const getUserIdFromToken = (token: string | null): string | null => {
        if (!token) return null; // אם אין טוקן, מחזירים null
    
        try {
            // פיצול ה-JWT לשלושה חלקים, החלק השני הוא ה-Payload
            const base64Url = token.split(".")[1]; 
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); 
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join("")
            );
    
            const decoded = JSON.parse(jsonPayload);
            
            // מחזירים את ה-ID מתוך ה-Token
            return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
        } catch (error) {
            console.error("שגיאה בפענוח ה-Token:", error);
            return null;
        }
    };
    // **טעינת נתוני המשתמש מתוך ה-token**
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         if (!state.token) return;
    //         try {
    //             const res = await axios.get(`https://server-property-tax.onrender.com/api/Users/${getUserIdFromToken(state.token)}`, {
    //                 headers: { Authorization: `Bearer ${state.token}` },
    //             });
    //             console.log(res);
                
    //             dispatch({ type: "LOGIN", data: { user: res.data, token: state.token } });
    //         } catch (err) {
    //             console.error("Failed to fetch user data", err);
    //             dispatch({ type: "LOGOUT" }); // ניקוי במקרה של שגיאה
    //         }
    //         // console.log(state.user);
    //         // console.log("-----",state.token);
    //     };
    //     fetchUser();
    // }, [state.token]);
    useEffect(() => {
        let baseUrl ;
        if (import.meta.env.VITE_BASE_URL) {
            baseUrl = import.meta.env.VITE_BASE_URL;
        } else {
            baseUrl = ""; // הגדרת baseUrl כברירת מחדל
            console.error("VITE_BASE_URL is not defined", import.meta.env);
        }
    
        const fetchUser = async () => {
            if (!state.token) return;
            try {
                const userId = getUserIdFromToken(state.token);
                if (!userId) return;
                const res = await axios.get(`${baseUrl}/Users/${userId}`, {
                    headers: { Authorization: `Bearer ${state.token}` },
                });
                dispatch({ type: "LOGIN", data: { user: res.data, token: state.token } });
            } catch (err) {
                alert("משתמש לא מורשה.");
                dispatch({ type: "LOGOUT" });
            }
        };
        fetchUser();
    }, [state.token]);
    // useEffect(() => {
    //   let baseUrl = process.env.REACT_APP_BASE_URL; // קבלת ה-BASE URL מ-env

    //     const fetchUser = async () => {
    //         if (!state.token) return; // אם אין טוקן, לא נבצע את הקריאה
    //         try {
    //             const userId = getUserIdFromToken(state.token);
    //             if (!userId) return;
    //             const res = await axios.get(`${baseUrl}/Users/${userId}`, {
    //                 headers: { Authorization: `Bearer ${state.token}` },
    //             });
    //             dispatch({ type: "LOGIN", data: { user: res.data, token: state.token } });
            
    //         } catch (err) {
    //             alert(" משתמש לא מורשה.");
    //             dispatch({ type: "LOGOUT" }); // ניקוי במקרה של שגיאה
    //         }           
    //     };
    //     fetchUser();
    // }, [state.token]); // הפונקציה תרוץ רק כשיש שינוי ב-token
    
    return (
        <AuthContext value={{ user: state.user, token: state.token, dispatch }}>
            {children}
        </AuthContext>
    );
};
export { AuthProvider, AuthContext };