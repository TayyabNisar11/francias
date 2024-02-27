import { Action, Dispatch } from 'redux';

export const handleDispatchError = (
	error: unknown,
	dispatch: Dispatch,
	action: (message: string) => Action,
) => {
	if (typeof error === 'string')
		dispatch(action(error?.toUpperCase() || 'Failure'));
	else if (error instanceof Error) dispatch(action(error.message || 'Failure'));
};
