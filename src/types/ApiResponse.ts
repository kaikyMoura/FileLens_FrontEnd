export type ApiResponse<T> = {
    success?: boolean
    message?: string
    data?: T;
    error?: string
    status?: number
  }