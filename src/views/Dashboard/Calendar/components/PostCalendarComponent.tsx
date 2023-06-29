import { Box, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';

import Utils from '../Utils';

const PostCalendarComponent = ({ event }: any) => {
  const MAX_TEXT_LENGTH = event.imageUrl ? 8 : 80;

  const truncatedTitle = Utils.truncateText(event.title, MAX_TEXT_LENGTH);

  return (
    <Box
      width={1}
      height={1}
      pl={1}
      sx={{
        borderRadius: '10px',
        border: 'none',
      }}
    >
      <Box display={'inline-flex'} width={1} mt={1}>
        <FacebookIcon fontSize="small" />
        <Typography
          variant="body2"
          component="span"
          fontWeight={600}
          pl={1}
          gutterBottom
        >
          {event.pageTitle}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" component="span" fontWeight={600} pr={1}>
          {event.time}
        </Typography>
        <Typography variant="body2" component="span">
          {truncatedTitle}
        </Typography>
      </Box>
      <Box width={1} height={1}>
        {event.imageUrl && (
          <Box
            component={'img'}
            src={event.imageUrl}
            height={'60%'}
            width={'95%'}
          />
        )}
      </Box>
    </Box>
  );
};

export default PostCalendarComponent;
