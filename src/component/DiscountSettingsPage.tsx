"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Box, Typography, Paper, Button, CircularProgress, Snackbar, Alert, Tabs, Tab, Divider } from "@mui/material"
import {
  getDiscountSettings,
  updateDiscountSettings,
  type SystemSettings,
  type IncomeDiscountTier,
  type SocioEconomicPricing,
} from "./discountSettingsApi"
import IncomeDiscountTable from "./IncomeDiscountTable"
import SocioEconomicTable from "./SocioEconomicTable"
import SaveIcon from "@mui/icons-material/Save"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const DiscountSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [tabValue, setTabValue] = useState(0)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const data = await getDiscountSettings()
      setSettings(data)
      setError(null)
    } catch (err) {
      setError("אירעה שגיאה בטעינת ההגדרות")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    if (!settings) return

    try {
      setSaving(true)
      await updateDiscountSettings(settings)
      setSuccess("ההגדרות נשמרו בהצלחה")
      setHasChanges(false)
      fetchSettings() // רענון הנתונים מהשרת
    } catch (err) {
      setError("אירעה שגיאה בשמירת ההגדרות")
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleUpdateIncomeTiers = (tiers: IncomeDiscountTier[]) => {
    if (settings) {
      setSettings({
        ...settings,
        incomeTiers: tiers,
      })
      setHasChanges(true)
    }
  }

  const handleUpdateSocioEconomicPrices = (prices: SocioEconomicPricing[]) => {
    if (settings) {
      setSettings({
        ...settings,
        socioEconomicPrices: prices,
      })
      setHasChanges(true)
    }
  }

  const handleCloseSnackbar = () => {
    setError(null)
    setSuccess(null)
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            הגדרות אחוזי הנחה בארנונה
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSaveSettings}
            disabled={saving || !hasChanges}
          >
            {saving ? <CircularProgress size={24} /> : "שמור הגדרות"}
          </Button>
        </Box>

        {settings && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              עודכן לאחרונה: {new Date(settings.lastUpdated).toLocaleString("he-IL")} ע"י {settings.updatedBy}
            </Typography>
          </Box>
        )}

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="הגדרות מערכת">
              <Tab label="הנחות לפי הכנסה" />
              <Tab label="מחירים לפי רמה סוציו-אקונומית" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            {settings && <IncomeDiscountTable tiers={settings.incomeTiers} onUpdate={handleUpdateIncomeTiers} />}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {settings && (
              <SocioEconomicTable prices={settings.socioEconomicPrices} onUpdate={handleUpdateSocioEconomicPrices} />
            )}
          </TabPanel>
        </Box>
      </Paper>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default DiscountSettingsPage
