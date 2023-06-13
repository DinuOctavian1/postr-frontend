import {
  useFBGetLoginStatus,
  useFbGetUserPages,
  useFbLogin,
  useFBLogout,
  useFbSchdulePost,
  useGeneratePost,
  usePostOnFacebook,
} from 'hooks';
import IFacebookPage from 'models/facebook/IFacebookPage';
import IFacebookSchedulePost from 'models/facebook/IFacebookSchedulePosts';
import IFBLoggedUser from 'models/facebook/IFBLoggedUser';
import IPost from 'models/interfaces/IPost';
import IFBPostRequest from 'models/request/facebook/IFBPostRRequest';
import IGeneratePostRequest from 'models/request/ICreatePostRequest';
import IFacebookGetUserfromLogin from 'models/response/facebook/IFacebookGetUserFromLogin';

import { useState } from 'react';
import IExternalLoginService from 'services/IExternalLoginService';

const useFacebookAPI = (
  apiAgent: any,
  socialMediaService: IExternalLoginService,
  toast: any,
) => {
  const [selectedPage, setSelectedPage] = useState<IFacebookPage>(null);
  const [post, setPost] = useState<IPost>({
    text: '',
    imageUrl: '',
  });

  const {
    isLoading: isLoadingPost,
    postOnFb,
    response,
  } = usePostOnFacebook(socialMediaService, toast);
  const {
    isLoading: isScheduleBtnLoading,
    resp,
    schedulePost,
  } = useFbSchdulePost(socialMediaService);
  const {
    post: generatedPost,
    generatePost,
    isLoading: isGeneratedPostLoading,
  } = useGeneratePost(apiAgent);
  const [getPages, pages] = useFbGetUserPages(socialMediaService);
  const loggedUser: IFBLoggedUser = useFBGetLoginStatus(socialMediaService);
  const { login, fbUser } = useFbLogin(socialMediaService);
  const logout = useFBLogout(socialMediaService);

  const handleLogin = () => {
    login();
  };

  const getFbUser = (): IFacebookGetUserfromLogin => {
    return fbUser;
  };

  const handleGetPages = (userId: string, accessToken: string) => {
    getPages(userId, accessToken);
  };

  const getPagesList = (): IFacebookPage[] => {
    return pages;
  };

  const handleLogout = () => {
    logout();
  };

  const getLoggedUser = (): IFBLoggedUser => {
    return loggedUser;
  };

  const handleSchedulePost = (model: IFacebookSchedulePost) => {
    schedulePost(model);
  };

  const handleSetPost = (newPost: IPost) => {
    setPost((prevPost) => ({
      ...prevPost,
      ...newPost,
    }));
  };

  const getSelectedPage = (): IFacebookPage => {
    return selectedPage;
  };

  const getPost = (): IPost => {
    return post;
  };

  const getGeneratedPost = (): string => {
    return generatedPost;
  };

  const getGeneratedPostLoadingState = (): boolean => {
    return isGeneratedPostLoading;
  };

  const getScheduleLoadingState = (): boolean => {
    return isScheduleBtnLoading;
  };

  const getPostLoadingState = (): boolean => {
    return isLoadingPost;
  };

  const handleSetPageChange = (page: IFacebookPage) => {
    setSelectedPage(page);
  };

  const handlePostNow = (postModel: IFBPostRequest) => {
    postOnFb(postModel);
  };

  const handlePostGeneration = (data: IGeneratePostRequest) => {
    generatePost(data);
  };

  //   useEffect(() => {
  //     const facebookService = socialMediaService;

  //     const getUserPages = async () => {
  //       const userId = ''; // Set the user ID here
  //       const token = ''; // Set the access token here

  //       const userPages = await useFbGetUserPages(facebookService);
  //       setPages(userPages);

  //       // Other logic related to fetching user pages
  //     };

  //     // Call the getUserPages function
  //     getUserPages();

  //     return () => {
  //       // Clean up any subscriptions, timers, etc.
  //     };
  //   }, []);

  return {
    getPagesList,
    getSelectedPage,
    getPost,
    getPostLoadingState,
    getScheduleLoadingState,
    getGeneratedPostLoadingState,
    getGeneratedPost,
    getFbUser,
    getLoggedUser,
    handleGetPages,
    handleLogin,
    handleLogout,
    handleSetPageChange,
    handleSetPost,
    handlePostNow,
    handleSchedulePost,
    handlePostGeneration,
  };
};

export default useFacebookAPI;
