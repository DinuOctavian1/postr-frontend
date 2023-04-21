import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { BASE_URL, ENDPOINT } from '../config/apiEndpoints';
import ICreatePost from '../interfaces/ICreatePost';
import { IEmailConfirmation } from '../interfaces/IEmailConfirmation';
import { IErrorResponse } from '../interfaces/IErrorResponse';
import IForgotPassword from '../interfaces/IForgotPassword';
import ILoginUser from '../interfaces/ILoginUser';
import IResetPassword from '../interfaces/IResetPassword';
import ISignupUser from '../interfaces/ISignupUser';

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.message === 'Network Error') {
      toast.error(error.message);
      return Promise.reject(error);
    }

    const data = (error?.response?.data as IErrorResponse) || undefined;
    const status: number = error?.response?.status || 0;
    const errorMsg =
      data?.errors?.[0] ??
      data?.title ??
      'Somethig went wrong. Please try again later!';

    switch (status) {
      case 400:
        toast.error(errorMsg);
        break;
      case 401:
        toast.error('Unauthorized');
        break;
      case 500:
        toast.error(errorMsg);
        break;
      default:
        toast.error(errorMsg);
        break;
    }
    return Promise.reject(error.response);
  },
);
const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: any) => axios.post(url, body).then(responseBody),
  put: (url: string, body: any) => axios.put(url).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Account = {
  getCurrentUser: () => request.get(ENDPOINT.GetUser),
  createUser: (data: ISignupUser) => request.post(ENDPOINT.Register, data),
  confirmEmail: (data: IEmailConfirmation) =>
    request.post(ENDPOINT.ConfirmEmail, data),
  forgotPassword: (data: IForgotPassword) =>
    request.post(ENDPOINT.ForgotPassword, data),
  resetPassword: (data: IResetPassword) =>
    request.post(ENDPOINT.ResetPassword, data),
  login: (data: ILoginUser) => request.post(ENDPOINT.Login, data),
};

const Post = {
  generateFacebookPost: (data: ICreatePost) =>
    request.post(ENDPOINT.GeneratePost, data),
};

const apiAgent = {
  Account,
  Post,
};

export default apiAgent;
