import { getVideos } from '@services/videos';
import { QueryParams } from '@store/shared';
import { videoActions } from '@store/slices/videos';
import { Dispatch } from 'redux';
import { handleDispatchError } from '@utils/error';

export const handleGetVideos =
	(param: QueryParams) => async (dispatch: Dispatch) => {
		try {
			dispatch(videoActions.getVideosListRequest(param));
			const data = await getVideos(param);
			dispatch(videoActions.getVideosListSuccess(data));
		} catch (error) {
			handleDispatchError(error, dispatch, videoActions.getVideosListFailed);
		}
	};
