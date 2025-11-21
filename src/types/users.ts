export interface User {
    id: string
    name: string
    email: string
    picture?: string
    address?: {
        street: string
        city: string
        zip: string
        country: string
    }
}

export interface UserData {
    email: string
    password: string
    name: string
    createdAt: number
}