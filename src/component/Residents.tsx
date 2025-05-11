// import { observer } from 'mobx-react';
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import UserStore from './UserStore';
// import { Box, IconButton, Typography } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import DeleteIcon from '@mui/icons-material/Delete';
// const Residents= observer(() => {
//         const navigate = useNavigate();
//         useEffect(() => {
//             UserStore.fetchUsers();                    
//         }, []);
//         const columns = [
//             { field: "id", headerName: "Resident ID", width: 120 },
//             { field: "idNumber", headerName: "Status", width: 150 },
//             { field: "username", headerName: "User ID", width: 150 },
//             {
//                 field: "actions",
//                 headerName: "Actions",
//                 width: 180,
//                 renderCell: (params: any) => (
//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     <IconButton
//                       color="primary"
//                       onClick={() => {
//                         navigate(`/residents/${params.row.id}`); // או כל פעולה של צפייה
//                       }}
//                     >
//                       <VisibilityIcon />
//                     </IconButton>
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDelete(params.row.id)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </Box>
//                 )
//               }
              
//         ];
//     return (
//         <Box sx={{ p: 3 }}>
//             <Typography variant="h4" sx={{ mb: 2 }}> Residents List</Typography>
//             <Box sx={{ height: 500, width: "100%" }}>
//                 <DataGrid 
//                  rows={UserStore.Residents || []}
//                  columns={columns}
//                  initialState={{
//                      pagination: {
//                          paginationModel: {
//                              pageSize: 15,
//                          },
//                      },
//                  }}
//                  disableRowSelectionOnClick
//                  autoHeight
//                     // rows={RequestStore.Requests || []} 
//                     // columns={columns} 
//                     // pageSize={10} 
//                     // disableSelectionOnClick
//                     // autoHeight
//                 />
//             </Box>
//         </Box>
//     );
// });

// export default Residents;
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
// import { useNavigate } from 'react-router-dom';
import UserStore from './UserStore';
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Fab,
  Grid
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { User } from './User';



const Residents = observer(() => {
//   const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  // Form dialog state
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [formData, setFormData] = useState<User>({
    passwordHash:'',
    idNumber: '',
    username: '',
    role:"Resident"
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    UserStore.fetchUsers();
  }, []);

  const handleOpenDialog = (id: number) => {
    setSelectedId(id);
    setOpenDialog(true);
    console.log(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      UserStore.fetchDeleteUsers(selectedId);
    }
    handleCloseDialog();
  };

  // Form handling functions
  const handleOpenFormDialog = (resident?: any) => {
    if (resident) {
      setFormData({
        id: resident.id,
        passwordHash: resident.passwordHash,
        idNumber: resident.idNumber,
        username: resident.username,
        role:"Resident"
      });
      setIsEditMode(true);
    } else {
      setFormData({
        passwordHash:'',
        idNumber: '',
        username: '',
        role:"Resident"
     });
      setIsEditMode(false);
    }
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setFormData({
        passwordHash:'',
        idNumber: '',
        username: '',
        role:"Resident"
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitForm = () => {
    if (isEditMode && formData.id) {
      // Update existing resident
      UserStore.updateUser(formData.id, formData);
    } else {
      // Add new resident
      UserStore.addUser(
          {
            idNumber: formData.idNumber,
            username: formData.username,
            password: formData.passwordHash,
            role: formData.role,
          });
    }
    handleCloseFormDialog();
  };

  const columns = [
    { field: "id", headerName: "Resident ID", width: 120 },
    { field: "idNumber", headerName: "User ID", width: 150 },
    { field: "username", headerName: "User Name", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* <IconButton
            color="primary"
            onClick={() => navigate(`/residents/${params.row.id}`)}
          >
            <VisibilityIcon />
          </IconButton> */}
          <IconButton
            color="info"
            onClick={() => handleOpenFormDialog(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleOpenDialog(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Residents List</Typography>
        <Fab 
          color="primary" 
          size="medium" 
          onClick={() => handleOpenFormDialog()}
          aria-label="add resident"
        >
          <AddIcon />
        </Fab>
      </Box>
      
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={UserStore.Residents || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 15 },
            },
          }}
          disableRowSelectionOnClick
          autoHeight
        />
      </Box>

      {/* דיאלוג מחיקה */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>מחיקת משתמש</DialogTitle>
        <DialogContent>
          <DialogContentText>
            האם אתה בטוח שברצונך למחוק את המשתמש? פעולה זו לא ניתנת לשחזור.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" variant="outlined">
            ביטול
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            מחק
          </Button>
        </DialogActions>
      </Dialog>

      {/* דיאלוג הוספה/עריכה */}
      <Dialog open={openFormDialog} onClose={handleCloseFormDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditMode ? 'עריכת משתמש' : 'הוספת משתמש חדש'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="idNumber"
                label="מספר זהות"
                value={formData.idNumber}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="username"
                label="שם משתמש"
                value={formData.username}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="passwordHash"
                label="סיסמא"
                value={formData.passwordHash}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFormDialog} color="primary" variant="outlined">
            ביטול
          </Button>
          <Button 
            onClick={handleSubmitForm} 
            color="primary" 
            variant="contained"
            disabled={!formData.idNumber || !formData.username}
          >
            {isEditMode ? 'עדכן' : 'הוסף'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default Residents;
// import React, { useEffect, useState } from 'react';
// import { observer } from 'mobx-react';
// import { useNavigate } from 'react-router-dom';
// import UserStore from './UserStore';
// import {
//   Box,
//   IconButton,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import DeleteIcon from '@mui/icons-material/Delete';

// const Residents = observer(() => {
//   const navigate = useNavigate();

//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedId, setSelectedId] = useState<number | null>(null);

//   useEffect(() => {
//     UserStore.fetchUsers();
//   }, []);

//   const handleOpenDialog = (id: number) => {
//     setSelectedId(id);
//     setOpenDialog(true);
//     console.log(id);
    
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedId(null);
//   };

//   const handleConfirmDelete = () => {
//     if (selectedId !== null) {
//       UserStore.fetchDeleteUsers(selectedId);
//     }
//     handleCloseDialog();
//   };

//   const columns = [
//     { field: "id", headerName: "Resident ID", width: 120 },
//     { field: "idNumber", headerName: "User ID", width: 150 },
//     { field: "username", headerName: "User Name", width: 150 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 180,
//       renderCell: (params: any) => (
//         <Box sx={{ display: "flex", gap: 1 }}>
//           <IconButton
//             color="primary"
//             onClick={() => navigate(`/residents/${params.row.id}`)}
//           >
//             <VisibilityIcon />
//           </IconButton>
//           <IconButton
//             color="error"
//             onClick={() => handleOpenDialog(params.row.id)}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//       )
//     }
//   ];

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}> Residents List</Typography>
//       <Box sx={{ height: 500, width: "100%" }}>
//         <DataGrid
//           rows={UserStore.Residents || []}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: { pageSize: 15 },
//             },
//           }}
//           disableRowSelectionOnClick
//           autoHeight
//         />
//       </Box>

//       {/* דיאלוג מחיקה */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>מחיקת משתמש</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             האם אתה בטוח שברצונך למחוק את המשתמש? פעולה זו לא ניתנת לשחזור.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary" variant="outlined">
//             ביטול
//           </Button>
//           <Button onClick={handleConfirmDelete} color="error" variant="contained">
//             מחק
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// });

// export default Residents;
