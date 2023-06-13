import IPost from 'models/interfaces/IPost';

interface IFacebookSchedulePost {
  pageId: string;
  pageAccessToken: string;
  post: IPost;
  publishDate: number;
}

export default IFacebookSchedulePost;
