/* eslint-disable indent */
import axios, { AxiosError, AxiosResponse } from 'axios';
import IAuthResponse from 'models/response/IAuthResponse';
import IGetFacebookPagesResponse from 'models/response/facebook/IFacebookGetPagesResponse';
import { toast } from 'react-toastify';

import { BASE_URL, ENDPOINT, ENDPOINT_FACEBOOK } from '../config/apiEndpoints';
import IGeneratePostRequest from '../models/request/ICreatePostRequest';
import IEmailConfirmationRequest from '../models/request/IEmailConfirmationRequest';
import IForgotPasswordRequest from '../models/request/IForgotPasswordRequest';
import ILoginRequest from '../models/request/ILoginRequest';
import IResetPasswordRequest from '../models/request/IResetPasswordRequest';
import ISignupRequest from '../models/request/ISignupRequest';
import IFBPostRequest from 'models/request/facebook/IFBPostRRequest';
import IFacebookSchedulePost from 'models/facebook/IFacebookSchedulePosts';

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

const modifyWithCredentials = (value: boolean) => {
  const previousValue = axios.defaults.withCredentials;
  axios.defaults.withCredentials = value;
  return previousValue;
};

const resetWithCredentials = (previousValue: boolean) => {
  axios.defaults.withCredentials = previousValue;
};

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
    const currentWithCredentials = modifyWithCredentials(false);

    const response = request.get<IGetFacebookPagesResponse>(
      ENDPOINT_FACEBOOK.GetPages(userId, userAccesToken),
    );

    resetWithCredentials(currentWithCredentials);

    return response;
  },

  postNow: async (requestModel: IFBPostRequest) => {
    const previousWithCredentials = modifyWithCredentials(false);

    const url = requestModel.mediaUrl
      ? ENDPOINT_FACEBOOK.PostTextWithPhoto(requestModel.pageId)
      : ENDPOINT_FACEBOOK.PostText(requestModel.pageId);

    const requestData = requestModel.mediaUrl
      ? {
          url: requestModel.mediaUrl,
          caption: requestModel.text,
          access_token: requestModel.pageAccessToken,
        }
      : {
          message: requestModel.text,
          access_token: requestModel.pageAccessToken,
        };

    const response = request.post(url, requestData);

    resetWithCredentials(previousWithCredentials);

    return response;
  },

  schedulePost: (model: IFacebookSchedulePost) => {
    const facebookUrl = model.post.imageUrl
      ? ENDPOINT_FACEBOOK.SchedulePostWithPhoto(
          model.pageId,
          model.pageAccessToken,
        )
      : ENDPOINT_FACEBOOK.SchedulePostWithText(
          model.pageId,
          model.pageAccessToken,
        );

    const requestData = model.post.imageUrl
      ? {
          message: model.post.text,
          published: false,
          scheduled_publish_time: model.publishDate,
          pageAccessToken: model.pageAccessToken,
          url: model.post.imageUrl,
        }
      : {
          message: model.post.text,
          published: false,
          scheduled_publish_time: model.publishDate,
          pageAccessToken: model.pageAccessToken,
        };
    const currentWithCredentials = modifyWithCredentials(false);

    const response = request.post(facebookUrl, requestData);

    resetWithCredentials(currentWithCredentials);

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
