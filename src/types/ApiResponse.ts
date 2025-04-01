import { AxiosResponseHeaders } from "axios";

export type ApiResponse<T> = {
    success?: boolean
    message?: string
    data?: T;
    headers?: any
    error?: string
    status?: number
  }