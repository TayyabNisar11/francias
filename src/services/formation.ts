import axios from "./connection-instance";
import moment from "moment";
moment.locale("fr");

export const getCities = () => axios.get('cities');

export const getYears = (from: number) => {
    let arr: any = []
    let currentYear = new Date().getFullYear();
    let earliestYear = from;
    while (currentYear >= earliestYear) {
        arr.push({ id: currentYear, name: currentYear })
        currentYear -= 1;
    }
    return arr;
}

export const getMonths = () => {
    return Array.from({ length: 12 }, (e, index) => {
        return ({ id: index + 1, name: moment(index + 1, 'M').format('MMMM') })
    })
};

export const downloadFormation = (payload: { city_id: string, month: string, year: string }) => axios.post('downloadFormationFile', payload);

export const submitFormationData = (payload: any) => axios.post("submitFormationForm", {}, { params: payload })