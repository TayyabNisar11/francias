import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseState } from '@store/shared';

export interface MenuItem {
    id: string | number,
    name: string

}


interface FormationState {
    cities: ResponseState<MenuItem>,
    months: ResponseState<MenuItem>,
    years: ResponseState<MenuItem>

}

const initialState: FormationState = {
    cities: { fetching: false, data: [] },
    months: { fetching: false, data: [] },
    years: { fetching: false, data: [] },

};

const getCitiesRequest: CaseReducer<FormationState> = (state) => {
    delete state.cities.error;
    state.cities.fetching = true;
};

const getCitiesSuccess: CaseReducer<FormationState, PayloadAction<ResponseState<MenuItem>>> = (state, { payload }) => {
    state.cities.data = payload.data;
    state.cities.fetching = false;
};

const getCitiesFailed: CaseReducer<FormationState, PayloadAction<string>> = (state, { payload }) => {
    state.cities.error = payload;
    state.cities.fetching = false;
};

const getMonthsSuccess: CaseReducer<FormationState, PayloadAction<ResponseState<MenuItem>>> = (state, { payload }) => {
    state.months.data = payload.data;
};

const getYearsSuccess: CaseReducer<FormationState, PayloadAction<ResponseState<MenuItem>>> = (state, { payload }) => {
    state.years.data = payload.data;
};


const formationSlice = createSlice({
    name: 'formation',
    initialState,
    reducers: {
        getCitiesRequest,
        getCitiesSuccess,
        getCitiesFailed,
        getMonthsSuccess,
        getYearsSuccess
    },
});

export const formationActions = formationSlice.actions;
export const formationReducer = formationSlice.reducer;
