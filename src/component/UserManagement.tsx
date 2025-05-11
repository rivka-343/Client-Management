// 
"use client"

import { useState } from "react"
import { Button, Box, Typography, Paper, Grid, Divider, useTheme, useMediaQuery } from "@mui/material"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import Register from "./Register"

const UserManagement = () => {
  const [showRegister, setShowRegister] = useState(false)
  const [registerPermission, setRegisterPermission] = useState<string | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleCloseRegister = () => {
    setShowRegister(false)
    setRegisterPermission(null)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "#f8f9fa",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          ניהול משתמשים
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          הוספת משתמשים חדשים למערכת והגדרת הרשאות
        </Typography>
      </Box>

      <Grid container spacing={2} direction={isMobile ? "column" : "row"}>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            startIcon={<AdminPanelSettingsIcon />}
            onClick={() => {
              console.log("try add manager")
              setRegisterPermission("Manager")
              setShowRegister(true)
            }}
            sx={{
              py: 1.5,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
                backgroundColor: "primary.dark",
              },
            }}
          >
            הוספת מנהל חדש
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="secondary"
            startIcon={<PersonAddIcon />}
            onClick={() => {
              setRegisterPermission("Employee")
              setShowRegister(true)
            }}
            sx={{
              py: 1.5,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
                backgroundColor: "secondary.dark",
              },
            }}
          >
            הוספת עובד חדש
          </Button>
        </Grid>
      </Grid>

      {/* הצגת טופס הרישום בהתאם למצב */}
      {showRegister && registerPermission && (
        <Box sx={{ mt: 3 }}>
          <Register permission={registerPermission} onClose={handleCloseRegister} />
        </Box>
      )}
    </Paper>
  )
}

export default UserManagement
