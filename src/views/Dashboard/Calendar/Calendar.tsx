import PostCalendarComponent from './components/PostCalendarComponent';

import {
  Calendar as ReactBigCalendar,
  dayjsLocalizer,
  EventPropGetter,
  EventWrapperProps,
} from 'react-big-calendar';

import { Box } from '@mui/material';

import events from './events';

import dayjs from 'dayjs';

const Calendar = () => {
  const localizer = dayjsLocalizer(dayjs);

  const CustomDateCellWrapper = ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: any;
  }) => (
    <Box
      sx={{
        height: '150px',
        width: '100%',
      }}
    >
      {children}
    </Box>
  );

  const components = {
    //timeSlotWrapper: CustomDateCellWrapper,
    eventWrapper: PostCalendarComponent,
  };

  return (
    <Box width={'100vw'} height={'85vh'} sx={{ position: 'relative', top: 90 }}>
      <ReactBigCalendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={['week', 'day', 'month']}
        toolbar={true}
        timeslots={1}
      />
    </Box>
  );
};

export default Calendar;
