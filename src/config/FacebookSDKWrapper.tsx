import { Outlet } from 'react-router-dom';
import useFacebookSDK from './FacebookSDK';

const FacebookSDKWrapper = () => {
  const { sdkLoaded, loading } = useFacebookSDK();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!sdkLoaded) {
    // You can customize the message or loading indicator here
    return <h1>Facebook SDK is still loading...</h1>;
  }

  return <Outlet />;
};

export default FacebookSDKWrapper;
