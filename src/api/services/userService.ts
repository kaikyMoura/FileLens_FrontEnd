import { ErrorResponse } from "@/model/ErrorReponse";
import { User } from "@/model/User";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import api from "..";
import { ApiResponse } from "@/model/ApiResponse";

const signup = async (user: User): Promise<ApiResponse<unknown>> => {
    console.log(user)
    try {
        const response = await api.post('/user/create', user)
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

const login = async (user: User): Promise<ApiResponse<unknown>> => {
    try {
        const response = await api.post('/user/login', user)
        const token = response.data.token
        console.log(token)
        if (token) {
            Cookies.set('Token', token, { path: '/', secure: true, sameSite: 'Strict' })
            return { success: true }
        }
        else {
            throw new Error('Token não recebido')
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
    signup,
    login
}