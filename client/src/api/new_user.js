
import axios from "axios"
const baseUrl = import.meta.env.VITE_API_URL

export const newUser = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/new-user`, data)
        return response.data
    } catch (error) {
        console.error(error)
    }
}