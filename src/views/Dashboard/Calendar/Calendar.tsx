import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import {
  Calendar as ReactBigCalendar,
  dayjsLocalizer,
} from 'react-big-calendar';
import dayjs from 'dayjs';

import PostCalendarComponent from './components/PostCalendarComponent';
import { FacebookService } from 'services';
import IFacebookGetScheduledPosts from 'models/response/facebook/IFacebookGetScheduledPots';
import IFacebookPage from 'models/facebook/IFacebookPage';
import Utils from './Utils';

import './index.css';

interface Props {
  pages: IFacebookPage[];
}

const Calendar = ({ pages }: Props) => {
  const localizer = dayjsLocalizer(dayjs);
  const defaultDate = dayjs().startOf('day').add(9, 'hours');

  const [scheduledPosts, setScheduledPosts] = useState<
    IFacebookGetScheduledPosts[]
  >([]);

  useEffect(() => {
    const getPosts = async () => {
      pages.forEach(async (page) => {
        const response =
          await FacebookService.getInstance().getScheduledPostsAsync(
            page.id,
            page.access_token,
          );

        setScheduledPosts((prev) => [
          ...prev,
          ...response.data.map((post) => ({ ...post, pageId: page.id })),
        ]);
      });
    };

    getPosts();
  }, []);

  const components = {
    event: PostCalendarComponent,
  };

  return (
    <Box width={'100vw'} height={'85vh'} sx={{ position: 'relative', top: 90 }}>
      <ReactBigCalendar
        localizer={localizer}
        events={Utils.convertScheduledPostsToEvents(scheduledPosts, pages)}
        defaultView="week"
        views={['week', 'day', 'month']}
        toolbar={true}
        timeslots={1}
        components={components}
        step={60}
        scrollToTime={defaultDate.toDate()}
      />
    </Box>
  );
};

export default Calendar;
