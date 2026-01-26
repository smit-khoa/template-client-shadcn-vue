import { defineStore } from "pinia"

interface Company {
    userId: string
    companyId: string
    companyName: string
}

interface UserData {
    userName: string
    email: string
    company: Company[]
}

interface State {
    user: UserData | null
}

// store USER
export const user = defineStore("user_store", {
    state: (): State => {
        return {
            user: null
        }
    },
    actions: {
        setUser(user: UserData) {
            this.user = user
        }
    },
    getters: {
        getUser: state => state.user,
        hasCompany: state => state.user?.company && state.user.company.length > 0
    }
})
