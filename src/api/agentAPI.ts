import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { BASE_URL, ENDPOINT } from '../config/apiEndpoints';
import ICreatePost from '../interfaces/ICreatePost';
import IEmailConfirmationRequest from '../models/request/IEmailConfirmationRequest';
import IForgotPasswordRequest from '../models/request/IForgotPasswordRequest';
import ILoginRequest from '../models/request/ILoginRequest';
import IResetPasswordRequest from '../models/request/IResetPasswordRequest';
import ISignupRequest from '../models/request/ISignupRequest';

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
    const data = error.response.data as string;
    toast.error(data);
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
  signup: (data: ISignupRequest) => request.post(ENDPOINT.Signup, data),
  confirmEmail: (data: IEmailConfirmationRequest) =>
    request.post(ENDPOINT.ConfirmEmail, data),
  forgotPassword: (data: IForgotPasswordRequest) =>
    request.post(ENDPOINT.ForgotPassword, data),
  resetPassword: (data: IResetPasswordRequest) =>
    request.post(ENDPOINT.ResetPassword, data),
  login: (data: ILoginRequest) => request.post(ENDPOINT.Login, data),
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
