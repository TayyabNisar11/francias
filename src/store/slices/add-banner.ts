import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseState } from "@store/shared";

interface Banner {
    id: number,
    title: string,
    slug: string
};



interface BannerState {
    slugs: ResponseState<Banner>,
};


const initialState: BannerState = {
    slugs: { fetching: false, data: [] }
};

export const getBannerSlugsSuccess: CaseReducer<BannerState, PayloadAction<ResponseState<Banner>>> = (state, { payload }) => {
    state.slugs.data = payload.data;
}

const bannerSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {
        getBannerSlugsSuccess
    }
});

export const bannerActions = bannerSlice.actions;
export const bannerReducer = bannerSlice.reducer;
