"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
} from "@mui/material"
import type { IncomeDiscountTier } from "./discountSettingsApi"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Cancel"

interface IncomeDiscountTableProps {
  tiers: IncomeDiscountTier[]
  onUpdate: (tiers: IncomeDiscountTier[]) => void
}

const IncomeDiscountTable: React.FC<IncomeDiscountTableProps> = ({ tiers, onUpdate }) => {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [tierToDelete, setTierToDelete] = useState<IncomeDiscountTier | null>(null)
  const [editValues, setEditValues] = useState<{ maxIncome: string; discountPercentage: string }>({
    maxIncome: "",
    discountPercentage: "",
  })
  const [newTier, setNewTier] = useState<{ maxIncome: string; discountPercentage: string }>({
    maxIncome: "",
    discountPercentage: "",
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleEdit = (tier: IncomeDiscountTier) => {
    setEditingId(tier.id)
    setEditValues({
      maxIncome: tier.maxIncome.toString(),
      discountPercentage: tier.discountPercentage.toString(),
    })
  }

  const handleSaveEdit = () => {
    if (editingId === null) return

    const maxIncome = Number.parseFloat(editValues.maxIncome)
    const discountPercentage = Number.parseFloat(editValues.discountPercentage)

    if (isNaN(maxIncome) || isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
      return
    }

    const updatedTiers = tiers.map((tier) =>
      tier.id === editingId ? { ...tier, maxIncome, discountPercentage } : tier,
    )

    onUpdate(updatedTiers.sort((a, b) => a.maxIncome - b.maxIncome))
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewTierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTier((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTier = () => {
    const maxIncome = Number.parseFloat(newTier.maxIncome)
    const discountPercentage = Number.parseFloat(newTier.discountPercentage)

    if (isNaN(maxIncome) || isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
      return
    }

    const newId = Math.max(0, ...tiers.map((t) => t.id)) + 1
    const updatedTiers = [...tiers, { id: newId, maxIncome, discountPercentage }]

    onUpdate(updatedTiers.sort((a, b) => a.maxIncome - b.maxIncome))
    setNewTier({ maxIncome: "", discountPercentage: "" })
    setShowAddForm(false)
  }

  const handleDeleteClick = (tier: IncomeDiscountTier) => {
    setTierToDelete(tier)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!tierToDelete) return

    const updatedTiers = tiers.filter((tier) => tier.id !== tierToDelete.id)
    onUpdate(updatedTiers)
    setDeleteDialogOpen(false)
    setTierToDelete(null)
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">מדרגות הנחה לפי הכנסה חודשית ממוצעת</Typography>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setShowAddForm(true)} disabled={showAddForm}>
          הוסף מדרגה
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>הכנסה חודשית מקסימלית</TableCell>
              <TableCell>אחוז הנחה</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showAddForm && (
              <TableRow>
                <TableCell>
                  <TextField
                    name="maxIncome"
                    value={newTier.maxIncome}
                    onChange={handleNewTierChange}
                    type="number"
                    size="small"
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position="end">₪</InputAdornment>,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="discountPercentage"
                    value={newTier.discountPercentage}
                    onChange={handleNewTierChange}
                    type="number"
                    size="small"
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={handleAddTier}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={() => setShowAddForm(false)}>
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}

            {tiers
              .sort((a, b) => a.maxIncome - b.maxIncome)
              .map((tier) => (
                <TableRow key={tier.id}>
                  <TableCell>
                    {editingId === tier.id ? (
                      <TextField
                        name="maxIncome"
                        value={editValues.maxIncome}
                        onChange={handleInputChange}
                        type="number"
                        size="small"
                        fullWidth
                        InputProps={{
                          endAdornment: <InputAdornment position="end">₪</InputAdornment>,
                        }}
                      />
                    ) : (
                      `${tier.maxIncome.toLocaleString()} ₪`
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === tier.id ? (
                      <TextField
                        name="discountPercentage"
                        value={editValues.discountPercentage}
                        onChange={handleInputChange}
                        type="number"
                        size="small"
                        fullWidth
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                      />
                    ) : (
                      `${tier.discountPercentage}%`
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === tier.id ? (
                      <>
                        <IconButton color="primary" onClick={handleSaveEdit}>
                          <SaveIcon />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit}>
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton color="primary" onClick={() => handleEdit(tier)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteClick(tier)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>מחיקת מדרגת הנחה</DialogTitle>
        <DialogContent>
          <DialogContentText>
            האם אתה בטוח שברצונך למחוק את מדרגת ההנחה עבור הכנסה עד {tierToDelete?.maxIncome.toLocaleString()} ₪?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>ביטול</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default IncomeDiscountTable
