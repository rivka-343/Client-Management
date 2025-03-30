 import RequestStore from "./RequestStore";
 import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect } from "react";
import { observer } from "mobx-react";
import { DataGrid } from "@mui/x-data-grid";
import {  Typography, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Requests = observer(() => {
    const navigate = useNavigate();
    useEffect(() => {
        RequestStore.fetchRequests();        
    }, []);
    const columns = [
        { field: "id", headerName: "Request ID", width: 120 },
        { field: "status", headerName: "Status", width: 150 },
        { 
            field: "requestDate", 
            headerName: "Request Date", 
            width: 180,
            valueGetter: (params:any) =>new Date(params).toLocaleDateString()
        },
        { field: "userId", headerName: "User ID", width: 150 },
        {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params:any) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              color="primary"
              onClick={() => navigate(`/request/${params.row.id}/view`)}
            >
              <VisibilityIcon />

            </IconButton>
          </Box>
        )
      }
    ];
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}> Request List</Typography>
            <Box sx={{ height: 500, width: "100%" }}>
                <DataGrid 
                 rows={RequestStore.Requests || []}
                 columns={columns}
                 initialState={{
                     pagination: {
                         paginationModel: {
                             pageSize: 15,
                         },
                     },
                 }}
                 disableRowSelectionOnClick
                 autoHeight
                    // rows={RequestStore.Requests || []} 
                    // columns={columns} 
                    // pageSize={10} 
                    // disableSelectionOnClick
                    // autoHeight
                />
            </Box>
        </Box>
    );
});

export default Requests;
  // import { observer } from 'mobx-react-lite';
// import { useEffect } from "react";
// import { Link, Outlet } from "react-router-dom";

// const Requests = observer(() => {
//     useEffect(() => {
//         RequestStore.fetchRequests();
//     }, []);

//     return (
//         <>
//             <div className="recipe-list-container">
//                 <div className="recipe-content">
//                     <Outlet />
//                 </div>
//                 <div className="recipe-nav">
//                     <h2>Request list</h2>
//                     <ul className="recipe-list" dir="rtl">
//                         {RequestStore.Requests?.length > 0 ? (
//                             RequestStore.Requests.map((Request, index) => (
//                                 <li key={index} className="recipe-item">
//                                     <Link to={`/recipes/${Request.id}`} className="recipe-link">
//                                     {Request.id}
//                                     </Link>
//                                     <p>{Request.status}</p>
//                                     <p>{new Date(Request.requestDate).toLocaleDateString()}</p>
//                                     <p>{Request.userId}</p>
//                                 </li>
//                             ))
//                         ) : (
//                             <p>לא נמצאו בקשות</p>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </>
//     );
// });

// export default Requests;
        //     {
    //         field: "actions",
    //         headerName: "פעולות",
    //         width: 150,
    //         renderCell: (params) => (
    //             <Button 
    //                 variant="contained" 
    //                 color="primary" 
    //                 onClick={() => navigate(`/requests/${params.id}`)}
    //             >
    //                 צפייה / עריכה
    //             </Button>
    //         )
    //     }
    // ];
// const Requests =  observer(() => {
//         useEffect(() => {
//             RequestStore.fetchRequests(); 
//         }, []);
//     return (
//         <>
//         <div className="recipe-list-container">
//             <div className="recipe-content">
//                 <Outlet />
//             </div>
//             <div className="recipe-nav">
//                 <h2>Recipe list</h2>
//                 <ul className="recipe-list" dir="rtl">
//                     {RequestStore.Requests.map((Request, index) => (
                        
//                         <li key={index} className="recipe-item">
//                             <Link to={`/recipes/${Request.Id}`} className="recipe-link">
//                                 {Request.Status}
//                             </Link>
//                             <p>{Request.Id}</p>
//                             <p>{new Date(Request.RequestDate).toLocaleDateString()}</p>
//                             <p>{Request.UserId}</p>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//         </>
//     )
// });


// export default Requests;
