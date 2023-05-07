import axios, { AxiosError, AxiosResponse } from 'axios';
import IUserResponse from 'interfaces/IUserResponse';
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

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

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
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: any) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: any) => axios.put<T>(url).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  getCurrentUser: () => request.get<IUserResponse>(ENDPOINT.GetUser),
  signup: (data: ISignupRequest) =>
    request.post<IUserResponse>(ENDPOINT.Signup, data),
  confirmEmail: (data: IEmailConfirmationRequest) =>
    request.post<IUserResponse>(ENDPOINT.ConfirmEmail, data),
  forgotPassword: (data: IForgotPasswordRequest) =>
    request.post<IUserResponse>(ENDPOINT.ForgotPassword, data),
  resetPassword: (data: IResetPasswordRequest) =>
    request.post<IUserResponse>(ENDPOINT.ResetPassword, data),
  login: (data: ILoginRequest) =>
    request.post<IUserResponse>(ENDPOINT.Login, data),
  logout: () => request.get<IUserResponse>(ENDPOINT.Logout),
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
