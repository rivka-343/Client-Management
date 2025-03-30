
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
// **יצירת Context**
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
        const fetchUser = async () => {
            if (!state.token) return; // אם אין טוקן, לא נבצע את הקריאה
            try {
                const userId = getUserIdFromToken(state.token);
                if (!userId) return;
    
                const res = await axios.get(`https://server-property-tax.onrender.com/api/Users/${userId}`, {
                    headers: { Authorization: `Bearer ${state.token}` },
                });
                dispatch({ type: "LOGIN", data: { user: res.data, token: state.token } });
            
            } catch (err) {
                alert(" משתמש לא מורשה.");
                dispatch({ type: "LOGOUT" }); // ניקוי במקרה של שגיאה
            }           
        };
        fetchUser();
    }, [state.token]); // הפונקציה תרוץ רק כשיש שינוי ב-token
    
    return (
        <AuthContext value={{ user: state.user, token: state.token, dispatch }}>
            {children}
        </AuthContext>
    );
};
export { AuthProvider, AuthContext };
//  const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [user, dispatch] = useReducer(userReducer, initialUser);

//     // **בדיקה אם יש משתמש שמור ב-LocalStorage**
//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("user") || "null");
//         if (storedUser) {
//             dispatch({ type: "LOGIN", data: storedUser });
//         }
//     }, []);

//     return <AuthContext
//      value={{ user, dispatch }}>{children}
//     </AuthContext>;
// };

// import { createContext, ReactNode, useReducer, useContext, useEffect } from "react";

// // **סוגי תפקידים**
// export type Role = "Manager" | "Employee" | null;

// // **מבנה המשתמש**
// export type User = {
//     id: number;
//     firstName?: string;
//     lastName?: string;
//     email?: string;
//     password?: string;
//     address?: string;
//     phone?: string;
//     role: Role;
// };
// // **אקשנים לניהול המשתמשים**
// export type Action =
//     | { type: "LOGIN"; data: User }
//     | { type: "LOGOUT" }
//     | { type: "REGISTER"; data: User }
//     | { type: "UPDATE_USER"; data: Partial<User> };

// // **סטייט ראשוני**
// const initialUser: User | null = null;

// // **Reducer לניהול משתמשים**
// const userReducer = (state: User | null, action: Action): User | null => {
//     switch (action.type) {
//         case "LOGIN":
//             return { ...action.data };
//         case "REGISTER":
//             return { ...action.data };
//         case "UPDATE_USER":
//             return state ? { ...state, ...action.data } : null;
//         case "LOGOUT":
//             return null;
//         default:
//             return state;
//     }
// };

// // **יצירת Context**
// const AuthContext = createContext<{ user: User | null; dispatch: React.Dispatch<Action> }>({
//     user: initialUser,
//     dispatch: () => null,
// });
// // **ספק גלובלי לכל האפליקציה**
//  const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [user, dispatch] = useReducer(userReducer, initialUser);

//     // **בדיקה אם יש משתמש שמור ב-LocalStorage**
//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("user") || "null");
//         if (storedUser) {
//             dispatch({ type: "LOGIN", data: storedUser });
//         }
//     }, []);

//     return <AuthContext
//      value={{ user, dispatch }}>{children}
//     </AuthContext>;
// };

// // **פונקציה נוחה לגישה ל-Context**
// // export const useAuth = () => useContext(AuthContext);

//  export { AuthProvider, AuthContext };
// import { createContext, ReactNode, useReducer } from "react"
// export type User = {
//     id: number,
//     firstName?: string,
//     lastName?: string,
//     email?: string,
//     pasword?: string,
//     adress?: string,
//     phone?: string
// }
// export type Action = {
//     type: 'ADD_USER',
//     data:User
// } | {
//     type: 'DELETE_USER',
//     id: number
// } | {
//     type: 'UPDATE_USER',
//     data:User
// }
// const UserContext = createContext<{ user: User | null; dispatch: React.Dispatch<Action> }>({ user: null, dispatch: () => null });
// const userReducer = (state: User | null, action: Action): User | null => {
//     switch (action.type) {
//         case 'ADD_USER':            
//             return { ...action.data };
//         case 'UPDATE_USER':
//             return {
//                 ...state,
//                 ...action.data
//             };
//         case 'DELETE_USER':
//             return null;
//         default:
//             return state;
//     }
// };
// const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [user, dispatch] = useReducer(userReducer, null);
//     return (
//         <UserContext value={{ user, dispatch }}>
//             {children}
//         </UserContext>
//     );
// };
// export { UserProvider, UserContext };