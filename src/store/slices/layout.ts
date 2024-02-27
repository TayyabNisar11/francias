import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseState, ResponseStateDetail } from '@store/shared';

export interface SocialItem {
    title: string,
    url: string,
};

interface MenuItem {
    title: string,
    url: string
}

export interface MainMenu<T> extends MenuItem {
    submenu_list?: T[]
}

interface LayoutState {
    socials: ResponseState<SocialItem>
    mainMenu: ResponseState<MainMenu<MenuItem>>,
    footerMenu: ResponseState<MainMenu<MenuItem>>
};

const initialState: LayoutState = {
    socials: { fetching: false, data: [] },
    mainMenu: { fetching: false, data: [] },
    footerMenu: { fetching: false, data: [] }
}
//Social Media Request
const getSocialMenuRequest: CaseReducer<LayoutState> = (state) => {
    delete state.socials.error;
    state.socials.fetching = true;
};
const getSocialMenuSuccess: CaseReducer<LayoutState, PayloadAction<ResponseState<SocialItem>>> = (state, { payload }) => {
    state.socials.fetching = false;
    state.socials.data = payload.data;
};
const getSocialMenuFailure: CaseReducer<LayoutState, PayloadAction<string>> = (state, { payload }) => {
    state.socials.fetching = false;
    state.socials.error = payload;
};

//Main Menu Request

const getMainMenuRequest: CaseReducer<LayoutState> = (state) => {
    delete state.mainMenu.error;
    state.mainMenu.fetching = true;

}
const getMainMenuSuccess: CaseReducer<LayoutState, PayloadAction<ResponseState<MainMenu<MenuItem>>>> = (state, { payload }) => {
    state.mainMenu.fetching = false;
    state.mainMenu.data = payload.data
}
const getMainMenuFailure: CaseReducer<LayoutState, PayloadAction<string>> = (state, { payload }) => {
    state.mainMenu.fetching = false;
    state.mainMenu.error = payload;
}

//Footer Menu Request

const getFooterMenuRequest: CaseReducer<LayoutState> = (state) => {
    delete state.footerMenu.error;
    state.footerMenu.fetching = true;
}
const getFooterMenuSuccess: CaseReducer<LayoutState, PayloadAction<ResponseState<MainMenu<MenuItem>>>> = (state, { payload }) => {
    state.footerMenu.fetching = false;
    state.footerMenu.data = payload.data;
}
const getFooterMenuFailure: CaseReducer<LayoutState, PayloadAction<string>> = (state, { payload }) => {
    state.footerMenu.fetching = false;
    state.footerMenu.error = payload;
}


const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        getSocialMenuRequest,
        getSocialMenuSuccess,
        getSocialMenuFailure,

        getMainMenuRequest,
        getMainMenuSuccess,
        getMainMenuFailure,

        getFooterMenuRequest,
        getFooterMenuSuccess,
        getFooterMenuFailure

    },
});

export const layoutActions = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;