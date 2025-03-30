import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../type";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const { user } = useContext(AuthContext);
    // if (!user) {
    //     return <Navigate to="/login" replace />; // אם המשתמש לא מחובר - נשלח אותו להתחברות
    // }
    if (user && !allowedRoles.includes(user.role ||"")) {
        console.log(user);
        console.log(allowedRoles.includes(user.role ||""));
        return <Navigate to="/unauthorized" replace />; // אם אין לו הרשאה - נשלח אותו לדף שגיאה
    }
    return <Outlet />; // אם יש הרשאה - טוען את הדף המבוקש
};

export default ProtectedRoute;
