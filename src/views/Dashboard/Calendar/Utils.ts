import IFacebookPage from 'models/facebook/IFacebookPage';
import IFacebookGetScheduledPosts from 'models/response/facebook/IFacebookGetScheduledPots';

const Utils = {
  convertScheduledPostsToEvents: (
    scheduledPosts: IFacebookGetScheduledPosts[],
    pages: IFacebookPage[],
  ) => {
    const convertedPosts = scheduledPosts.map((post) => {
      const currentPage: IFacebookPage = Utils.getPageById(pages, post.pageId);

      const scheduledTime = new Date(+post.scheduled_publish_time * 1000);
      const startDate = new Date(
        scheduledTime.getFullYear(),
        scheduledTime.getMonth(),
        scheduledTime.getDate(),
        scheduledTime.getHours(),
      );
      const endDate = new Date(
        scheduledTime.getFullYear(),
        scheduledTime.getMonth(),
        scheduledTime.getDate(),
        scheduledTime.getHours() + 1,
      );
      return {
        title: post.message,
        allDay: false,
        start: startDate,
        end: endDate,
        pageTitle: currentPage?.name,
        time: scheduledTime.getHours() + ':' + scheduledTime.getMinutes(),
        imageUrl: post.full_picture || '',
      };
    });

    return convertedPosts;
  },

  truncateText: (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  },

  getPageById: (pages: any[], pageId: string) => {
    const page = pages.find((page) => page.id === pageId);
    return page;
  },
};

export default Utils;
