interface IResetPassword {
  email: string;
  token: string;
  newPassword: string;
  confirmedPassword: string;
}
export default IResetPassword;
