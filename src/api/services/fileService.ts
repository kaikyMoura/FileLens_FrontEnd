import axios, { AxiosError } from "axios"
import api from ".."
import { ApiResponse } from "@/model/ApiResponse"
import { ErrorResponse } from "@/model/ErrorReponse"

const extractData = async (file: File): Promise<ApiResponse<string>> => {
    const formData = new FormData()

    try {
        formData.append("file", file)

        const response = await api.post('/file/extract-data', formData)

        return {
            success: true,
            data: response.data.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.details
                };
            }
        }
    }
    return {
        error: "Internal server error"
    }
}

export {
    extractData
}