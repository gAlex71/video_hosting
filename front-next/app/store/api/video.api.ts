import { VIDEO } from '@/services/video.service'
import { api } from './api'
import { IVideo, IVideoDto } from '@/types/video.interface'

export const videoApi = api.injectEndpoints({
	endpoints: builder => ({
		getVideoBySearchTerm: builder.query<IVideo[], string>({
			query: searchTerm => ({ url: `/${VIDEO}`, params: { searchTerm } }),
		}),
        getVideoById: builder.query<IVideo, number>({
			query: id => `/${VIDEO}/${id}`,
            providesTags: (result, error, id) => [{ type: 'Video', id }]
		}),
        getVideoPrivate: builder.query<IVideo, number>({
			query: id => `/${VIDEO}/get-private/${id}`,
            providesTags: (result, error, id) => [{ type: 'Video', id }]
		}),
        createVideo: builder.mutation<string, void>({
            query: () => ({
                url: `${VIDEO}`,
                method: 'POST'
            }),
            //Обновляем профиль
            invalidatesTags: () => [{ type: 'Profile' }]
        }),
        updateVideo: builder.mutation<IVideo, IVideoDto>({
            query: ({ id, ...body }) => ({
                url: `/${VIDEO}/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: (result, error, {id}) => [
                {type: 'Video', id},
                {type: 'Profile'}
            ]
        }),
        updateViews: builder.mutation<IVideo, number>({
            query: id => ({
                url: `/${VIDEO}/update-views/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: (results, error, id) => [{type: 'Video', id}]
        }),
        updateLikes: builder.mutation<IVideo, number>({
            query: id => ({
                url: `/${VIDEO}/update-likes/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: (results, error, id) => [{type: 'Video', id}]
        }),
        deleteVideo: builder.mutation<void, number>({
            query: id => ({
                url: `/${VIDEO}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: () => [{type: 'Video'}, {type: 'Profile'}]
        }),
	})
})