interface IFacebookGetScheduledPosts {
  created_time: string;
  id: string;
  message: string;
  scheduled_publish_time: string;
  pageId: string;
  full_picture?: string;
}

export default IFacebookGetScheduledPosts;
