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
import type { SocioEconomicPricing } from "./discountSettingsApi"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Cancel"

interface SocioEconomicTableProps {
  prices: SocioEconomicPricing[]
  onUpdate: (prices: SocioEconomicPricing[]) => void
}

const SocioEconomicTable: React.FC<SocioEconomicTableProps> = ({ prices, onUpdate }) => {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [priceToDelete, setPriceToDelete] = useState<SocioEconomicPricing | null>(null)
  const [editValues, setEditValues] = useState<{ pricePerSquareMeter: string }>({
    pricePerSquareMeter: "",
  })
  const [newPrice, setNewPrice] = useState<{ socioEconomicLevel: string; pricePerSquareMeter: string }>({
    socioEconomicLevel: "",
    pricePerSquareMeter: "",
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleEdit = (price: SocioEconomicPricing) => {
    setEditingId(price.id)
    setEditValues({
      pricePerSquareMeter: price.pricePerSquareMeter.toString(),
    })
  }

  const handleSaveEdit = () => {
    if (editingId === null) return

    const pricePerSquareMeter = Number.parseFloat(editValues.pricePerSquareMeter)

    if (isNaN(pricePerSquareMeter) || pricePerSquareMeter < 0) {
      return
    }

    const updatedPrices = prices.map((price) => (price.id === editingId ? { ...price, pricePerSquareMeter } : price))

    onUpdate(updatedPrices.sort((a, b) => a.socioEconomicLevel - b.socioEconomicLevel))
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewPrice((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddPrice = () => {
    const socioEconomicLevel = Number.parseInt(newPrice.socioEconomicLevel)
    const pricePerSquareMeter = Number.parseFloat(newPrice.pricePerSquareMeter)

    if (
      isNaN(socioEconomicLevel) ||
      isNaN(pricePerSquareMeter) ||
      socioEconomicLevel < 1 ||
      socioEconomicLevel > 10 ||
      pricePerSquareMeter < 0
    ) {
      return
    }

    // בדיקה אם כבר קיימת רמה סוציו-אקונומית זהה
    if (prices.some((p) => p.socioEconomicLevel === socioEconomicLevel)) {
      alert("רמה סוציו-אקונומית זו כבר קיימת במערכת")
      return
    }

    const newId = Math.max(0, ...prices.map((p) => p.id)) + 1
    const updatedPrices = [...prices, { id: newId, socioEconomicLevel, pricePerSquareMeter }]

    onUpdate(updatedPrices.sort((a, b) => a.socioEconomicLevel - b.socioEconomicLevel))
    setNewPrice({ socioEconomicLevel: "", pricePerSquareMeter: "" })
    setShowAddForm(false)
  }

  const handleDeleteClick = (price: SocioEconomicPricing) => {
    setPriceToDelete(price)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!priceToDelete) return

    const updatedPrices = prices.filter((price) => price.id !== priceToDelete.id)
    onUpdate(updatedPrices)
    setDeleteDialogOpen(false)
    setPriceToDelete(null)
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">מחירים למ"ר לפי רמה סוציו-אקונומית</Typography>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setShowAddForm(true)} disabled={showAddForm}>
          הוסף מחיר
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>רמה סוציו-אקונומית</TableCell>
              <TableCell>מחיר למ"ר</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showAddForm && (
              <TableRow>
                <TableCell>
                  <TextField
                    name="socioEconomicLevel"
                    value={newPrice.socioEconomicLevel}
                    onChange={handleNewPriceChange}
                    type="number"
                    size="small"
                    fullWidth
                    inputProps={{ min: 1, max: 10 }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="pricePerSquareMeter"
                    value={newPrice.pricePerSquareMeter}
                    onChange={handleNewPriceChange}
                    type="number"
                    size="small"
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position="end">₪</InputAdornment>,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={handleAddPrice}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={() => setShowAddForm(false)}>
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}

            {prices
              .sort((a, b) => a.socioEconomicLevel - b.socioEconomicLevel)
              .map((price) => (
                <TableRow key={price.id}>
                  <TableCell>{price.socioEconomicLevel}</TableCell>
                  <TableCell>
                    {editingId === price.id ? (
                      <TextField
                        name="pricePerSquareMeter"
                        value={editValues.pricePerSquareMeter}
                        onChange={handleInputChange}
                        type="number"
                        size="small"
                        fullWidth
                        InputProps={{
                          endAdornment: <InputAdornment position="end">₪</InputAdornment>,
                        }}
                      />
                    ) : (
                      `${price.pricePerSquareMeter.toLocaleString()} ₪`
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === price.id ? (
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
                        <IconButton color="primary" onClick={() => handleEdit(price)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteClick(price)}>
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
        <DialogTitle>מחיקת מחיר למ"ר</DialogTitle>
        <DialogContent>
          <DialogContentText>
            האם אתה בטוח שברצונך למחוק את המחיר למ"ר עבור רמה סוציו-אקונומית {priceToDelete?.socioEconomicLevel}?
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

export default SocioEconomicTable
