import axios from "./connection-instance";

export const SubscribeNewsletter = (payload: any) => axios.post("SubmitnNewsletter", payload);

export const submitContactUs = (payload: any) => axios.post("SubmitContactUs", payload);

export const submitGuide = (payload: any) => axios.post("SubmitGuide", payload);
