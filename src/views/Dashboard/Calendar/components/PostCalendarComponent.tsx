import { Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';

import { EventWrapperProps } from 'react-big-calendar';

const PostCalendarComponent = ({
  event,
}: EventWrapperProps<{
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
}>) => (
  <Box
    sx={{
      backgroundColor: 'red',
      borderRadius: '10px',
      // height: '150px',
      // width: '100px',
    }}
  >
    <FacebookIcon />
    {event.title}
  </Box>
);

export default PostCalendarComponent;
