import axios from "./connection-instance";

export const getLessons = () => axios.get('lessons');

export const getLessonDetail = (slug: string) => axios.get('lessons/' + slug);

export const getLessonsSlugs = () => axios.get('mostpopularLessons');
