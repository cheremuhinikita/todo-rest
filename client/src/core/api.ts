import axios, { AxiosError } from 'axios';

import { API_URL, TOKEN_KEY } from '@core/constants';
import { notifyServerError } from '@core/notify';
import { IErrorResponse } from '@core/interfaces';
import { relocationOnError } from '@core/utils';
import { ErrorCodesNumbers } from '@core/enums';

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

axiosInstance.interceptors.response.use(undefined, ({ response }: AxiosError<IErrorResponse>) => {
	if (response) {
		relocationOnError(response, ErrorCodesNumbers.InternalServerError);
		relocationOnError(response, ErrorCodesNumbers.NotFound);
		relocationOnError(response, ErrorCodesNumbers.Forbidden);
	}

	if (response?.data?.message) notifyServerError(response?.data?.message);

	return Promise.reject(response);
});

export default axiosInstance;
