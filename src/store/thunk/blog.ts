import { Dispatch } from 'redux';
import { getBlogs, getBlogDetail, getBlogCategories } from '@services/blog';
import { blogActions } from '@store/slices/blog';
import { handleDispatchError } from '@utils/error';

export const handleGetBlogList = () => async (dispatch: Dispatch) => {
	try {
		dispatch(blogActions.getBlogListRequest());
		const { data } = await getBlogs();
		dispatch(blogActions.getBlogListSuccess(data));
	} catch (error) {
		handleDispatchError(error, dispatch, blogActions.getBlogListFailure);
	}
};

export const handleGetBlogDetail =
	(slug: string) => async (dispatch: Dispatch) => {
		try {
			dispatch(blogActions.getBlogDeatilRequest());
			const { data } = await getBlogDetail(slug);
			dispatch(blogActions.getBlogDeatilSuccess(data));
		} catch (error) {
			handleDispatchError(error, dispatch, blogActions.getBlogDeatilFailure);
		}
	};

export const handleGetBlogCategories = () => async (dispatch: Dispatch) => {
	try {
		dispatch(blogActions.getBlogCategoriesRequest());
		const { data } = await getBlogCategories();
		dispatch(blogActions.getBlogCategoriesSuccess(data));
	} catch (error) {
		handleDispatchError(error, dispatch, blogActions.getBlogCategoriesFailure);
	}
};
