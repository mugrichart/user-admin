
import axios from "axios"
const baseUrl = import.meta.env.VITE_API_URL

export const fetchUsers = async (filters) => {
    try {
        const response = await axios.get(`${baseUrl}/users`, {params: filters})
        return response.data
    } catch (error) {
        console.error(error)
    }
}