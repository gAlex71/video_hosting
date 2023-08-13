import { IUser } from "@/types/user.interface";
import { axiosBase } from "api/axios"

export const USER = 'user';

export const UserService = {
    async getAll(){
        return axiosBase.get<IUser[]>(`/${USER}`)
    },

    async getUser(id: number){
        return axiosBase.get<IUser>(`/${USER}/by-id/${id}`)
    }
};