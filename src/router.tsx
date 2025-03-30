import { createBrowserRouter } from "react-router-dom";
import Home from "./component/home";
import AppLayout from "./component/AppLayout";
import { AuthProvider  } from "./type";
import UserManagement from "./component/UserManagement";
import ProtectedRoute from "./component/ProtectedRoute";
import Request from './component/Requests'
import RequestDetails from "./component/RequestDetails";
export const router = createBrowserRouter([
    {
        path: '/', element:
        <AuthProvider>
            <AppLayout />
        </AuthProvider>,
        errorElement: <h1>error</h1>,
        children: [
            { path: '/', element: 
                <Home />
             },
             {
                path: 'user-management',
                element: <ProtectedRoute allowedRoles={["Manager"]} />, // בודק הרשאה לפני טעינת הדף
                children: [{ path: '', element: <UserManagement /> }]
            },
            {
                path: 'request',
                element: <ProtectedRoute allowedRoles={["Manager","Employee"]} />, // בודק הרשאה לפני טעינת הדף
                children: [{ path: '', element: <Request /> },
                            {path:':id/view', element:<RequestDetails/>}
                ]
            }
            // {
            //     path: 'recipes', 
            //     element: 
            //      <RecipeList />,
            //     children: [
            //         { path: ':id', element: <RecipeDetail /> }
            //     ]
            // },{
            //     path: 'add-recipe', element: <AddRecipe />
            // }
        ]
    }
])