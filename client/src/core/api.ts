import axios, { AxiosError } from 'axios';

import { API_URL, TOKEN_KEY } from '@core/constants';
import { notifyServerError } from '@core/notify';

const axiosInstance = axios.create({
	baseURL: API_URL,
});

axiosInstance.interceptors.request.use((requestConfig) => {
	const token = window.localStorage.getItem(TOKEN_KEY);
	if (!token) {
		return requestConfig;
	}

	const newReqConfig = requestConfig;
	newReqConfig.headers.Authorization = `Bearer ${token}`;

	return newReqConfig;
});

axiosInstance.interceptors.response.use(undefined, (error: AxiosError) => {
	const { message } = error.response?.data;
	if (message) notifyServerError(message);

	return Promise.reject(error);
});

export default axiosInstance;
