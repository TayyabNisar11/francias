import axios from "./connection-instance";

export const getSocialsList = () => axios.get('socialMenu');

export const getMainMenu = () => axios.get('mainNavigation');

export const getFooterMenu = () => axios.get('footerMenu');

export const getPageSlug = (title: string) => axios.get('pageSlugbyTitle', { params: { title } });

export const getCmsPageContent = (slug: string) => axios.get("pageContent/" + slug)