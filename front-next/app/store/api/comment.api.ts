import { IComment, ICommentDto } from '@/types/comment.interface'
import { api } from './api'

export const commentApi = api.injectEndpoints({
	endpoints: builder => ({
		createComment: builder.mutation<IComment, ICommentDto>({
			query: body => ({
				url: 'comment',
				method: 'POST',
				body
			}),
			//обновляем данные о конкретном видео
			invalidatesTags: (result, error, { videoId }) => [
				{ type: 'Video', id: videoId }
			]
		})
	})
})
