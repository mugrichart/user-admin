
import axios from "axios"
const baseUrl = import.meta.env.VITE_API_URL

export const removeUser = async (id) => {
    try {
        // delete user with url param
        const response = await axios.delete(`${baseUrl}/remove-user/${id}`)
        console.log(id, response.data)
        return response.data
    } catch (error) {
        console.error(error)
    }
}