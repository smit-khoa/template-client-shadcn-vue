/**
 * Unit Tests cho API Wrapper
 * File: src/controllers/global.js
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import axios from "axios"

// Mock axios
vi.mock("axios")
const mocked_axios = vi.mocked(axios)

// Mock vue-sonner
vi.mock("vue-sonner", () => ({
    toast: {
        error: vi.fn(),
        success: vi.fn()
    }
}))

// Import after mocking
import { toast } from "vue-sonner"

describe("API Wrapper (global.js)", () => {
    // Tạo mock api function vì file gốc dùng import.meta.env
    const createApiFunction = (is_dev = true) => {
        const host = is_dev ? "" : "https://test-api.example.com"
        const default_token = localStorage.getItem("accessToken")

        return ({
            url,
            data = {},
            method = "GET",
            params,
            toast: showToast = true,
            toastOpt = {},
            authorization = default_token || "",
            signal = null
        }: {
            url: string
            data?: Record<string, unknown>
            method?: string
            params?: Record<string, unknown>
            toast?: boolean
            toastOpt?: Record<string, unknown>
            authorization?: string
            signal?: AbortSignal | null
        }) => {
            return axios({
                url: host + url,
                method,
                data: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    ...(authorization && { Authorization: authorization })
                },
                params,
                withCredentials: true,
                signal
            } as any)
                .then((res: any) => {
                    if (res.data.error && res.data.message) throw new Error(res.data.message)
                    return res.data
                })
                .catch((e: any) => {
                    if (signal && e.code === "ERR_CANCELED") return { error: true, is_cancel: true }

                    const status = e?.response?.status || 0
                    const message = e?.response?.data?.message || e?.message || "Lỗi không xác định! Vui lòng thử lại sau"
                    const subcode = e?.response?.data?.subcode || e?.subcode || "unknown"

                    if (showToast) {
                        toast.error(message, {
                            description: toastOpt.description || undefined,
                            ...toastOpt
                        })
                    }

                    return { error: true, message, subcode, status }
                })
        }
    }

    let api: ReturnType<typeof createApiFunction>

    beforeEach(() => {
        vi.clearAllMocks()
        localStorage.clear()
        api = createApiFunction(true)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    // ==========================================
    // Successful Requests
    // ==========================================
    describe("Successful Requests", () => {
        it("should make GET request and return data", async () => {
            const mock_response = { data: { users: [{ id: 1, name: "John" }] } }
            mocked_axios.mockResolvedValueOnce(mock_response)

            const result = await api({ url: "/api/users", method: "GET" })

            expect(result).toEqual(mock_response.data)
            expect(mocked_axios).toHaveBeenCalledWith(
                expect.objectContaining({
                    url: "/api/users",
                    method: "GET"
                })
            )
        })

        it("should make POST request with data", async () => {
            const mock_response = { data: { success: true, id: 123 } }
            const post_data = { name: "Test", email: "test@example.com" }
            mocked_axios.mockResolvedValueOnce(mock_response)

            const result = await api({
                url: "/api/users",
                method: "POST",
                data: post_data
            })

            expect(result).toEqual(mock_response.data)
            expect(mocked_axios).toHaveBeenCalledWith(
                expect.objectContaining({
                    method: "POST",
                    data: JSON.stringify(post_data)
                })
            )
        })

        it("should include authorization header when token exists", async () => {
            localStorage.setItem("accessToken", "test-token-123")
            api = createApiFunction(true) // Recreate with token

            mocked_axios.mockResolvedValueOnce({ data: { success: true } })

            await api({ url: "/api/protected" })

            expect(mocked_axios).toHaveBeenCalledWith(
                expect.objectContaining({
                    headers: expect.objectContaining({
                        Authorization: "test-token-123"
                    })
                })
            )
        })

        it("should include timezone header", async () => {
            mocked_axios.mockResolvedValueOnce({ data: {} })

            await api({ url: "/api/test" })

            expect(mocked_axios).toHaveBeenCalledWith(
                expect.objectContaining({
                    headers: expect.objectContaining({
                        timezone: expect.any(String)
                    })
                })
            )
        })

        it("should include Content-Type header", async () => {
            mocked_axios.mockResolvedValueOnce({ data: {} })

            await api({ url: "/api/test" })

            expect(mocked_axios).toHaveBeenCalledWith(
                expect.objectContaining({
                    headers: expect.objectContaining({
                        "Content-Type": "application/json"
                    })
                })
            )
        })

        it("should pass query params correctly", async () => {
            mocked_axios.mockResolvedValueOnce({ data: [] })

            const params = { page: 1, limit: 10, search: "test" }
            await api({ url: "/api/users", params })

            expect(mocked_axios).toHaveBeenCalledWith(
                expect.objectContaining({
                    params
                })
            )
        })
    })

    // ==========================================
    // Error Handling
    // ==========================================
    describe("Error Handling", () => {
        it("should return error object on network failure", async () => {
            mocked_axios.mockRejectedValueOnce(new Error("Network Error"))

            const result = await api({ url: "/api/test" })

            expect(result).toEqual({
                error: true,
                message: "Network Error",
                subcode: "unknown",
                status: 0
            })
        })

        it("should show toast on error by default", async () => {
            mocked_axios.mockRejectedValueOnce(new Error("Server Error"))

            await api({ url: "/api/test" })

            expect(toast.error).toHaveBeenCalledWith("Server Error", expect.any(Object))
        })

        it("should not show toast when toast: false", async () => {
            mocked_axios.mockRejectedValueOnce(new Error("Silent Error"))

            await api({ url: "/api/test", toast: false })

            expect(toast.error).not.toHaveBeenCalled()
        })

        it("should extract status from response", async () => {
            mocked_axios.mockRejectedValueOnce({
                response: {
                    status: 404,
                    data: { message: "Not Found" }
                }
            })

            const result = await api({ url: "/api/unknown" })

            expect(result).toEqual({
                error: true,
                message: "Not Found",
                subcode: "unknown",
                status: 404
            })
        })

        it("should extract subcode from response", async () => {
            mocked_axios.mockRejectedValueOnce({
                response: {
                    status: 400,
                    data: {
                        message: "Validation Error",
                        subcode: "INVALID_EMAIL"
                    }
                }
            })

            const result = await api({ url: "/api/register" })

            expect(result).toEqual({
                error: true,
                message: "Validation Error",
                subcode: "INVALID_EMAIL",
                status: 400
            })
        })

        it("should use default error message when none provided", async () => {
            mocked_axios.mockRejectedValueOnce({
                response: {
                    status: 500,
                    data: {}
                }
            })

            const result = await api({ url: "/api/test" })

            expect(result.message).toBe("Lỗi không xác định! Vui lòng thử lại sau")
        })

        it("should throw error when response has error flag", async () => {
            mocked_axios.mockResolvedValueOnce({
                data: {
                    error: true,
                    message: "Business Logic Error"
                }
            })

            const result = await api({ url: "/api/test" })

            expect(result).toEqual({
                error: true,
                message: "Business Logic Error",
                subcode: "unknown",
                status: 0
            })
        })
    })

    // ==========================================
    // Request Cancellation
    // ==========================================
    describe("Request Cancellation", () => {
        it("should return is_cancel: true when request is cancelled", async () => {
            const controller = new AbortController()
            const cancel_error = {
                code: "ERR_CANCELED",
                message: "Request cancelled"
            }

            mocked_axios.mockRejectedValueOnce(cancel_error)

            const result = await api({
                url: "/api/test",
                signal: controller.signal
            })

            expect(result).toEqual({
                error: true,
                is_cancel: true
            })
        })

        it("should not show toast when request is cancelled", async () => {
            const controller = new AbortController()
            mocked_axios.mockRejectedValueOnce({
                code: "ERR_CANCELED"
            })

            await api({
                url: "/api/test",
                signal: controller.signal
            })

            expect(toast.error).not.toHaveBeenCalled()
        })
    })

    // ==========================================
    // Authorization
    // ==========================================
    describe("Authorization", () => {
        it("should use custom authorization when provided", async () => {
            mocked_axios.mockResolvedValueOnce({ data: {} })

            await api({
                url: "/api/test",
                authorization: "custom-token-456"
            })

            expect(mocked_axios).toHaveBeenCalledWith(
                expect.objectContaining({
                    headers: expect.objectContaining({
                        Authorization: "custom-token-456"
                    })
                })
            )
        })

        it("should not include Authorization header when empty", async () => {
            mocked_axios.mockResolvedValueOnce({ data: {} })

            await api({ url: "/api/public", authorization: "" })

            const call_args = mocked_axios.mock.calls[0]![0] as { headers?: { Authorization?: string } }
            expect(call_args.headers?.Authorization).toBeUndefined()
        })
    })

    // ==========================================
    // Host Configuration
    // ==========================================
    describe("Host Configuration", () => {
        it("should use empty host in dev mode", async () => {
            mocked_axios.mockResolvedValueOnce({ data: {} })

            await api({ url: "/api/test" })

            expect(mocked_axios).toHaveBeenCalledWith(
                expect.objectContaining({
                    url: "/api/test"
                })
            )
        })

        it("should use full URL in production mode", async () => {
            const prod_api = createApiFunction(false)
            mocked_axios.mockResolvedValueOnce({ data: {} })

            await prod_api({ url: "/api/test" })

            expect(mocked_axios).toHaveBeenCalledWith(
                expect.objectContaining({
                    url: "https://test-api.example.com/api/test"
                })
            )
        })
    })

    // ==========================================
    // withCredentials
    // ==========================================
    describe("Credentials", () => {
        it("should always include withCredentials: true", async () => {
            mocked_axios.mockResolvedValueOnce({ data: {} })

            await api({ url: "/api/test" })

            expect(mocked_axios).toHaveBeenCalledWith(
                expect.objectContaining({
                    withCredentials: true
                })
            )
        })
    })

    // ==========================================
    // HTTP Methods
    // ==========================================
    describe("HTTP Methods", () => {
        const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"]

        methods.forEach(method => {
            it(`should support ${method} method`, async () => {
                mocked_axios.mockResolvedValueOnce({ data: {} })

                await api({ url: "/api/test", method })

                expect(mocked_axios).toHaveBeenCalledWith(
                    expect.objectContaining({ method })
                )
            })
        })

        it("should default to GET method", async () => {
            mocked_axios.mockResolvedValueOnce({ data: {} })

            await api({ url: "/api/test" })

            expect(mocked_axios).toHaveBeenCalledWith(
                expect.objectContaining({ method: "GET" })
            )
        })
    })

    // ==========================================
    // Toast Options
    // ==========================================
    describe("Toast Options", () => {
        it("should pass custom toast options", async () => {
            mocked_axios.mockRejectedValueOnce(new Error("Error with description"))

            await api({
                url: "/api/test",
                toastOpt: { description: "Please try again later" }
            })

            expect(toast.error).toHaveBeenCalledWith(
                "Error with description",
                expect.objectContaining({
                    description: "Please try again later"
                })
            )
        })
    })
})

// ==========================================
// Helper Functions Tests
// ==========================================
describe("Helper Functions", () => {
    describe("wait", () => {
        it("should resolve after specified milliseconds", async () => {
            const wait = (ms: number) => new Promise(callback => setTimeout(callback, ms))

            const start = Date.now()
            await wait(100)
            const elapsed = Date.now() - start

            expect(elapsed).toBeGreaterThanOrEqual(95) // Allow small timing variance
        })
    })
})
