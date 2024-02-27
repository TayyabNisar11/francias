import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseState, ResponseStateDetail } from "@store/shared";

interface PostDetail {
    id: number,
    user_id: number,
    title: string,
    slug: string,
    content: string,
    short_description: string,
    published_at: string,
    magazine_id: number,
    featured_images: []
}


interface CategoryDetail<Post> {
    id: number,
    name: string,
    post: Post
};

interface MagazineItem<Categories> {
    id: number,
    name: string,
    magazine_date: string,
    categories?: Categories[]
}

interface BlogCategories {
    id: number,
    name: string,
    slug: string
}

interface BlogState {
    list: ResponseState<MagazineItem<CategoryDetail<PostDetail>>>,
    detail: ResponseStateDetail<PostDetail>,
    categories: ResponseState<BlogCategories>
}

const initialState: BlogState = {
    list: { fetching: false, data: [] },
    detail: { fetching: false, data: null },
    categories: { fetching: false, data: [] }
}

//Get Blog List Request
const getBlogListRequest: CaseReducer<BlogState> = (state) => {
    delete state.list.error;
    state.list.fetching = true;
}

const getBlogListSuccess: CaseReducer<BlogState, PayloadAction<ResponseState<MagazineItem<CategoryDetail<PostDetail>>>>> = (state, { payload }) => {
    state.list.fetching = false;
    state.list.data = payload.data
}
const getBlogListFailure: CaseReducer<BlogState, PayloadAction<string>> = (state, { payload }) => {
    state.list.fetching = false;
    state.list.error = payload
}


//Get Blog Detail Request

const getBlogDeatilRequest: CaseReducer<BlogState> = (state) => {
    delete state.detail.error;
    state.detail.fetching = true;
}

const getBlogDeatilSuccess: CaseReducer<BlogState, PayloadAction<ResponseStateDetail<PostDetail>>> = (state, { payload }) => {
    state.detail.fetching = false;
    state.detail.data = payload.data
}
const getBlogDeatilFailure: CaseReducer<BlogState, PayloadAction<string>> = (state, { payload }) => {
    state.detail.fetching = false;
    state.detail.error = payload
}

//Get Blog Categories

const getBlogCategoriesRequest: CaseReducer<BlogState> = (state) => {
    delete state.categories.error;
    state.categories.fetching = true;
}

const getBlogCategoriesSuccess: CaseReducer<BlogState, PayloadAction<ResponseState<BlogCategories>>> = (state, { payload }) => {
    state.categories.fetching = false;
    state.categories.data = payload.data
}
const getBlogCategoriesFailure: CaseReducer<BlogState, PayloadAction<string>> = (state, { payload }) => {
    state.categories.fetching = false;
    state.categories.error = payload
}


const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        getBlogListRequest,
        getBlogListSuccess,
        getBlogListFailure,

        getBlogDeatilRequest,
        getBlogDeatilSuccess,
        getBlogDeatilFailure,

        getBlogCategoriesRequest,
        getBlogCategoriesSuccess,
        getBlogCategoriesFailure,

    },
});

export const blogActions = blogSlice.actions;
export const blogReducer = blogSlice.reducer;