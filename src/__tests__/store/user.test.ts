/**
 * Unit Tests cho User Store (Pinia)
 * File: src/store/user.ts
 */

import { describe, it, expect, beforeEach } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { user } from "@/store/user"

describe("User Store", () => {
    beforeEach(() => {
        // Tạo Pinia instance mới cho mỗi test
        setActivePinia(createPinia())
    })

    // ==========================================
    // Initial State Tests
    // ==========================================
    describe("Initial State", () => {
        it("should have empty user object as initial state", () => {
            const user_store = user()
            expect(user_store.user).toEqual({})
        })

        it("should return empty object from getUser getter", () => {
            const user_store = user()
            expect(user_store.getUser).toEqual({})
        })
    })

    // ==========================================
    // setUser Action Tests
    // ==========================================
    describe("setUser Action", () => {
        it("should set user with userName and email", () => {
            const user_store = user()
            const new_user = { userName: "John Doe", email: "john@example.com" }

            user_store.setUser(new_user)

            expect(user_store.user).toEqual(new_user)
        })

        it("should update user info when called again", () => {
            const user_store = user()

            // Set initial user
            user_store.setUser({ userName: "John", email: "john@example.com" })

            // Update user
            const updated_user = { userName: "Jane", email: "jane@example.com" }
            user_store.setUser(updated_user)

            expect(user_store.user).toEqual(updated_user)
        })

        it("should handle special characters in userName", () => {
            const user_store = user()
            const user_with_special = {
                userName: "Nguyễn Văn Ánh",
                email: "nguyen@example.com"
            }

            user_store.setUser(user_with_special)

            expect(user_store.user).toEqual(user_with_special)
        })

        it("should handle long email addresses", () => {
            const user_store = user()
            const user_with_long_email = {
                userName: "Test",
                email: "very.long.email.address.with.many.dots@subdomain.example.com"
            }

            user_store.setUser(user_with_long_email)

            expect(user_store.user).toEqual(user_with_long_email)
        })

        it("should handle empty strings", () => {
            const user_store = user()
            const empty_user = { userName: "", email: "" }

            user_store.setUser(empty_user)

            expect(user_store.user).toEqual(empty_user)
        })
    })

    // ==========================================
    // getUser Getter Tests
    // ==========================================
    describe("getUser Getter", () => {
        it("should return current user state", () => {
            const user_store = user()
            const test_user = { userName: "Test User", email: "test@example.com" }

            user_store.setUser(test_user)

            expect(user_store.getUser).toEqual(test_user)
        })

        it("should be reactive to state changes", () => {
            const user_store = user()

            // Initial state
            expect(user_store.getUser).toEqual({})

            // After setting user
            user_store.setUser({ userName: "User1", email: "user1@test.com" })
            expect(user_store.getUser).toEqual({ userName: "User1", email: "user1@test.com" })

            // After updating user
            user_store.setUser({ userName: "User2", email: "user2@test.com" })
            expect(user_store.getUser).toEqual({ userName: "User2", email: "user2@test.com" })
        })

        it("should return reference to state.user", () => {
            const user_store = user()
            const test_user = { userName: "Test", email: "test@test.com" }

            user_store.setUser(test_user)

            // getUser should return the same reference as user
            expect(user_store.getUser).toBe(user_store.user)
        })
    })

    // ==========================================
    // Store Isolation Tests
    // ==========================================
    describe("Store Isolation", () => {
        it("should have isolated state between tests", () => {
            // This test verifies that beforeEach creates a fresh store
            const user_store = user()
            expect(user_store.user).toEqual({})
        })

        it("should maintain state within the same test", () => {
            const user_store = user()

            user_store.setUser({ userName: "First", email: "first@test.com" })
            expect(user_store.getUser).toEqual({ userName: "First", email: "first@test.com" })

            // Same store instance should persist
            user_store.setUser({ userName: "Second", email: "second@test.com" })
            expect(user_store.getUser).toEqual({ userName: "Second", email: "second@test.com" })
        })
    })

    // ==========================================
    // Edge Cases
    // ==========================================
    describe("Edge Cases", () => {
        it("should handle unicode characters in userName", () => {
            const user_store = user()
            const unicode_user = {
                userName: "用户名 🎉 مستخدم",
                email: "unicode@test.com"
            }

            user_store.setUser(unicode_user)

            expect(user_store.user).toEqual(unicode_user)
        })

        it("should handle very long userName", () => {
            const user_store = user()
            const long_name = "A".repeat(1000)
            const user_with_long_name = {
                userName: long_name,
                email: "long@test.com"
            }

            user_store.setUser(user_with_long_name)

            expect(user_store.user).toEqual(user_with_long_name)
            expect((user_store.user as any).userName.length).toBe(1000)
        })

        it("should handle email with plus sign", () => {
            const user_store = user()
            const user_with_plus = {
                userName: "Test",
                email: "user+tag@example.com"
            }

            user_store.setUser(user_with_plus)

            expect(user_store.user).toEqual(user_with_plus)
        })
    })

    // ==========================================
    // Store Name Test
    // ==========================================
    describe("Store Configuration", () => {
        it("should have correct store id", () => {
            const user_store = user()
            expect(user_store.$id).toBe("user_store")
        })
    })
})
