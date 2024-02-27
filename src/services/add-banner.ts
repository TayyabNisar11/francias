import axios from "./connection-instance";

export const getAddBannerSlugs = () => axios.get('BannerList');

export const getAddBannerBySlug = async (slug: string) => {
    try {
        const response = await axios.get("BannerBySlug/" + slug);
        return response.data?.data[0]?.featured_images[0]?.path
    } catch (error) {
        console.log(error);

    }
}

export const getBannerImage = async (banners: any, page: string) => {
    const bannerSlug = banners.filter((banner: any) => banner.page == page)[0];

    const image = await getAddBannerBySlug(bannerSlug?.slug);
    return {
        src: image,
        url: bannerSlug?.url

    }
}


