
import axios from "axios"
const baseUrl = import.meta.env.VITE_API_URL

export const patchUser = async (id, new_role) => {
    try {
        const response = await axios.patch(`${baseUrl}/patch-user/${id}`, {new_role})
        return response.data
    } catch (error) {
        console.error(error)
    }
}