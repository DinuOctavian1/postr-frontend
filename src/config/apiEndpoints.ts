export const BASE_URL = 'https://localhost:44345';

export const ENDPOINT = {
  Signup: '/api/auth/signup',
  Login: '/api/auth/login',
  Logout: '/api/auth/logout',
  GetUser: '/api/auth/user',
  ConfirmEmail: '/api/auth/confirm-email',
  ForgotPassword: '/api/auth/forgetpassword',
  ResetPassword: '/api/auth/resetpassword',
  Login2FA: '/api/auth/login/2fa',
  GeneratePost: 'api/post/generate',
  UploadFile: 'api/post/upload',
};

export const ENDPOINT_FACEBOOK = {
  GetPages: (userId: string, userAccessToken: string) =>
    `https://graph.facebook.com/${userId}/accounts?access_token=${userAccessToken}`,
  PostTextWithPhoto: (pageId: string) =>
    `https://graph.facebook.com/${pageId}/photos`,
  PostText: (pageId: string) => `https://graph.facebook.com/${pageId}/feed`,
  SchedulePost: (pageId: string, pageAccessToken: string) =>
    `https://graph.facebook.com/${pageId}/feed?access_token=${pageAccessToken}`,
};
