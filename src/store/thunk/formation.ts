import { Dispatch } from 'redux';
import { getCities, getMonths, getYears } from '@services/formation';
import { formationActions } from '@store/slices/formation';
import { handleDispatchError } from '@utils/error';

export const handleGetCities = () => async (dispatch: Dispatch) => {
	try {
		dispatch(formationActions.getCitiesRequest());
		const { data } = await getCities();
		dispatch(formationActions.getCitiesSuccess(data));
	} catch (error) {
		handleDispatchError(error, dispatch, formationActions.getCitiesFailed);
	}
};

export const handleGetMonths = () => async (dispatch: Dispatch) => {
	const data = getMonths();
	dispatch(formationActions.getMonthsSuccess({ data: data }));
};

export const handleGetYears = () => async (dispatch: Dispatch) => {
	const data = getYears(2000);
	dispatch(formationActions.getYearsSuccess({ data: data }));
};
