import axios from "axios"

const API_URL = import.meta.env.VITE_BASE_URL || "" 

export interface IncomeDiscountTier {
  id: number
  maxIncome: number
  discountPercentage: number
}

export interface SocioEconomicPricing {
  id: number
  socioEconomicLevel: number
  pricePerSquareMeter: number
}

export interface SystemSettings {
  incomeTiers: IncomeDiscountTier[]
  socioEconomicPrices: SocioEconomicPricing[]
  lastUpdated: string
  updatedBy: string
}

// const token = sessionStorage.getItem("token"); // שליפת ה-Token מה-Session Storage
//             const response = await fetch(`${this.baseUrl}/Document/request-files/${id}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}` // הוספת ה-Token ל-Header
//                 }

export const getDiscountSettings = async (): Promise<SystemSettings> => {
  const response = await axios.get<SystemSettings>(`${API_URL}/DiscountSettings`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
  return response.data
}

export const updateDiscountSettings = async (settings: SystemSettings): Promise<void> => {
  await axios.put(`${API_URL}/DiscountSettings`, settings, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
}
