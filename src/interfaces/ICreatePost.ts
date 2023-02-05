import { SocialPlatform } from '../types/socialMediaPlatform';

interface ICreatePost {
    postDescription: string;
    businessDescription: string;
    socialPlatform: SocialPlatform | '';
}

export default ICreatePost;
