import { SocialPlatform } from 'types/socialMediaPlatform';

interface IGeneratePostRequest {
  postDescription: string;
  pageCategories: string;
  pageName: string;
  socialMediaPlatform: SocialPlatform;
}

export default IGeneratePostRequest;
