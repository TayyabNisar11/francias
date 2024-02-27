import axios from "./connection-instance";


export const getBlogs = () => axios.get('posts');

export const getBlogDetail = (slug: string) => axios.get('posts/' + slug);

export const getBlogCategories = () => axios.get('blogcategory');

export const getBlogCategoryPosts = (id: string) => axios.get('categoryPosts/' + id);

export const getPostsSlugs = () => axios.get('mostpopularPosts');