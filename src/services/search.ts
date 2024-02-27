import axios from "./connection-instance";

export const getSearchResults = (type: string, query: any) => axios.get('search', {
    params: {
        type,
        query
    }
});





