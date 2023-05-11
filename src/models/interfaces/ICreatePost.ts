import { SocialPlatform } from '../../types/socialMediaPlatform';

interface ICreatePost {
  postDescription: string;
  businessDescription: string;
  socialPlatform: SocialPlatform | '';
  productDescription: string;
  objective: string;
}

export default ICreatePost;
