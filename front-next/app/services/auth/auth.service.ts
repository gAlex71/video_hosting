import { axiosBase } from "api/axios"
import { IAuthData } from "./auth.helper"

const AUTH = 'auth';

export const AuthService = {
    async login(email: string, password: string){
        const response = await axiosBase.post<IAuthData>(`/${AUTH}/login`, {
            email, password
        })

        return response.data;
    },

    async register(email: string, password: string){
        const response = await axiosBase.post<IAuthData>(`/${AUTH}/register`, {
            email, password
        })

        return response.data;
    },
}