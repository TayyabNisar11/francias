import axios from "./connection-instance";

export const getGames = () => axios.get('games');

export const getGameDetails = (slug: string) => axios.get('games/' + slug);

export const getGameSlugs = () => axios.get('mostpopularGames');
