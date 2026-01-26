import { AxiosRequestConfig } from "axios"

export interface ApiOptions {
    url: string
    data?: Record<string, unknown>
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    params?: Record<string, unknown>
    toast?: boolean
    toastOpt?: Record<string, unknown>
    signal?: AbortSignal | null
    authorization?: string
}

export interface ApiErrorResponse {
    error: true
    message: string
    subcode: string
    is_cancel?: boolean
    status?: number
}

export interface ApiSuccessResponse<T = unknown> {
    error?: false
    data?: T
    [key: string]: unknown
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse

export declare const host: string
export declare const url_smit_dashboard: string

export declare function toSnakeCase<T>(obj: T): T
export declare function toCamelCase<T>(obj: T): T
export declare function api<T = unknown>(options: ApiOptions): Promise<T | ApiErrorResponse>
export declare function wait(ms: number): Promise<void>
export declare function waitForElement(selector: string): Promise<void>
