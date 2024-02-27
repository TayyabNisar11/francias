import { Dispatch } from 'redux';
import { getSocialsList, getMainMenu, getFooterMenu } from '@services/layout';
import { layoutActions } from '@store/slices/layout';
import { handleDispatchError } from '@utils/error';

export const handleGetSocialsMenu = () => async (dispatch: Dispatch) => {
	try {
		dispatch(layoutActions.getSocialMenuRequest());
		const { data } = await getSocialsList();
		dispatch(layoutActions.getSocialMenuSuccess(data));
	} catch (error) {
		handleDispatchError(error, dispatch, layoutActions.getSocialMenuFailure);
	}
};

export const handleGetMainMenu = () => async (dispatch: Dispatch) => {
	try {
		dispatch(layoutActions.getMainMenuRequest());
		let { data } = await getMainMenu();
		dispatch(layoutActions.getMainMenuSuccess(data));
	} catch (error) {
		handleDispatchError(error, dispatch, layoutActions.getMainMenuFailure);
	}
};

export const handleGetFooterMenu = () => async (dispatch: Dispatch) => {
	try {
		dispatch(layoutActions.getFooterMenuRequest());
		const { data } = await getFooterMenu();
		dispatch(layoutActions.getFooterMenuSuccess(data));
	} catch (error) {
		handleDispatchError(error, dispatch, layoutActions.getFooterMenuFailure);
	}
};
