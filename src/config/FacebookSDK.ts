import { useEffect, useState } from 'react';

const useFacebookSDK = () => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFacebookSDK = () => {
      return new Promise((resolve) => {
        window.fbAsyncInit = () => {
          window.FB.init({
            appId: process.env.REACT_APP_FACEBOOK_APP_ID,
            status: true,
            xfbml: true,
            version: 'v2.7',
          });
          resolve(window.FB);
        };

        // Load the Facebook SDK asynchronously
        (function (d, s, id) {
          const fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          const js: any = d.createElement(s);
          js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk.js';
          fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
      });
    };

    loadFacebookSDK().then((FB) => {
      setSdkLoaded(true);
      setLoading(false);
    });
  }, []);

  return { sdkLoaded, loading };
};

export default useFacebookSDK;
