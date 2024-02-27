import axios from "./connection-instance";

export const getHomePagePosts = () => axios.get('homePagePosts');

export const getHomePageBlogAndLesson = () => axios.get('randBlogLesson');

export const getHomePageFeaturePosts = () => axios.get('featuredPosts');


export const getHomePageTabsContent = () => axios.get('homePageTabsContent');

export const getHomePageGame = () => axios.get("homePageGame");

export const getNewsletterCount = () => axios.get("newsletterTotal");



