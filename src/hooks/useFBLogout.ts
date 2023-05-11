import IExternalLoginService from 'services/IExternalLoginService';

const useFBLogout = (
  externalLoginService: IExternalLoginService,
): (() => void) => {
  const logout = () => externalLoginService.logout();

  return logout;
};

export default useFBLogout;
