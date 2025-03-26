import { ApiResponse } from "@/types/ApiResponse"
import { ErrorResponse } from "@/types/ErrorReponse"
import axios, { AxiosError } from "axios"
import api from "./api"

const extractData = async (file: File | string | null): Promise<ApiResponse<string>> => {
    const formData = new FormData()

    try {
        formData.append("file", file!)

        const response = await api.post('/file/extract-data', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return {
            success: true,
            message: response.data.message,
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

const uploadFile = async (email: string, file: File | string | null): Promise<ApiResponse<unknown>> => {
    const formData = new FormData()

    try {
        formData.append("email", email)
        formData.append("file", file!)

        console.log([...formData.entries()])
        const response = await api.post('/file/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return {
            success: true,
            message: response.data.message,
            data: response.data.url
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
    extractData,
    uploadFile
}
