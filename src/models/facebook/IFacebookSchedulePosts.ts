import IPost from 'models/interfaces/IPost';

interface IFacebookSchedulePosts {
  pageId: string;
  pageAccessToken: string;
  post: IPost;
  publishDate: number;
}

export default IFacebookSchedulePosts;
