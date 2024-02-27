import { Dispatch } from 'redux';
import { getAddBannerSlugs } from "@services/add-banner";
import { bannerActions } from "@store/slices/add-banner";


export const handleGetBannerSlugs = () => async (dispatch: Dispatch) => {
    try {
        const { data } = await getAddBannerSlugs();
        const list = data.data[0]?.map((item: any) => {
            return ({
                slug: item.slug,
                url: item.url,
                page: item.pageBanner.name,
                position: item.positionBanner.name
            })
        });

        dispatch(bannerActions.getBannerSlugsSuccess({ data: list }));
    } catch (error: any) {
        console.log(error);
    }
};

