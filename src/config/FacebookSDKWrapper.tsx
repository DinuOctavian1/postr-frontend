import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useFacebookSDK from './FacebookSDK';

const FacebookSDKWrapper = () => {
  const { sdkLoaded, loading } = useFacebookSDK();

  useEffect(() => {
    console.log('FacebookSDKWrapper');
  }, [loading, sdkLoaded]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!sdkLoaded) {
    return <h1>Facebook SDK is still loading...</h1>;
  }

  return <Outlet />;
};

export default FacebookSDKWrapper;
// function useEfect(arg0: () => void, arg1: boolean[]) {
//   throw new Error('Function not implemented.');
// }
