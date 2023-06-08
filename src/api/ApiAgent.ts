import axios, { AxiosError, AxiosResponse } from 'axios';
import IAuthResponse from 'models/response/IAuthResponse';
import IGetFacebookPagesResponse from 'models/response/facebook/IFacebookGetPagesResponse';
import { toast } from 'react-toastify';

import { BASE_URL, ENDPOINT } from '../config/apiEndpoints';
import IGeneratePostRequest from '../models/request/ICreatePostRequest';
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
  getCurrentUser: () => request.get<IAuthResponse>(ENDPOINT.GetUser),
  signup: (data: ISignupRequest) =>
    request.post<IAuthResponse>(ENDPOINT.Signup, data),
  confirmEmail: (data: IEmailConfirmationRequest) =>
    request.post<IAuthResponse>(ENDPOINT.ConfirmEmail, data),
  forgotPassword: (data: IForgotPasswordRequest) =>
    request.post<IAuthResponse>(ENDPOINT.ForgotPassword, data),
  resetPassword: (data: IResetPasswordRequest) =>
    request.post<IAuthResponse>(ENDPOINT.ResetPassword, data),
  login: (data: ILoginRequest) =>
    request.post<IAuthResponse>(ENDPOINT.Login, data),
  logout: () => request.get<IAuthResponse>(ENDPOINT.Logout),
};

const Facebook = {
  getFbPages: (userId: string, userAccesToken: string) => {
    const currentWithCredentials = axios.defaults.withCredentials;

    axios.defaults.withCredentials = false;

    const response = request.get<IGetFacebookPagesResponse>(
      `https://graph.facebook.com/${userId}/accounts?access_token=${userAccesToken}`,
    );

    axios.defaults.withCredentials = currentWithCredentials;

    return response;
  },

  createPost: (text: string, pageId: string, pageAccessToken: string) => {
    const currentWithCredentials = axios.defaults.withCredentials;
    axios.defaults.withCredentials = false;
    const response = request.post(
      `https://graph.facebook.com/${pageId}/feed?access_token=${pageAccessToken}`,
      { message: text },
    );
    axios.defaults.withCredentials = currentWithCredentials;

    return response;
  },

  schedulePost: (
    text: string,
    pageId: string,
    pageAccessToken: string,
    publishDate: number,
  ) => {
    const currentWithCredentials = axios.defaults.withCredentials;
    axios.defaults.withCredentials = false;
    const response = request.post(
      `https://graph.facebook.com/${pageId}/feed?access_token=${pageAccessToken}`,
      {
        message: text,
        published: false,
        scheduled_publish_time: publishDate,
        pageAccessToken: pageAccessToken,
      },
    );
    axios.defaults.withCredentials = currentWithCredentials;

    return response;
  },
};

const Post = {
  generateFacebookPost: (data: IGeneratePostRequest) =>
    request.post(ENDPOINT.GeneratePost, data),

  uploadFile: (file: File) => {
    return request.post(ENDPOINT.UploadFile, file);
  },
};

const apiAgent = {
  Account,
  Post,
  Facebook,
};

export default apiAgent;
