import { IVideo } from "@/types/video.interface";
import { axiosBase } from "api/axios"

export const VIDEO = 'video';

export const VideoService = {
    async getAll(){
        return axiosBase.get<IVideo[]>(`/${VIDEO}`)
    },

    async getMostPopular(){
        return axiosBase.get<IVideo[]>(`/${VIDEO}/most-popular`)
    }
};