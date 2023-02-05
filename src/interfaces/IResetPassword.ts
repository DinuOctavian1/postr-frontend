export default interface IResetPassword {
    email: string;
    token: string;
    newPassword: string;
    confirmedPassword: string;
}
