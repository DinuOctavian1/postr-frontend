interface IResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
  confirmedPassword: string;
}
export default IResetPasswordRequest;
