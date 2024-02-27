import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


const ConnectionInstance = axios.create({
  baseURL: process.env.SERVER
});

ConnectionInstance.interceptors.request.use(
  (requestConfig: AxiosRequestConfig) => {
    if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') {
      // console.info('API Request:', requestConfig);
    }
    return requestConfig;
  },
  function (error) {
    if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') {
      // console.error('API Request Error:', error);
    }
    return Promise.reject(error);
  },
);

ConnectionInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') {
      // console.info('API Response:', response);
    }
    return response;
  },
  (error) => {
    if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') {
      // console.error('API Response Error:', error);
    }
    const errorMessage = error?.response?.data?.message;
    if (errorMessage) {
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(error);
  },
);

export default ConnectionInstance;
