import { Box, Button, Modal, Typography } from '@mui/material';
import dayjs from 'dayjs';
import IFacebookSchedulePost from 'models/facebook/IFacebookSchedulePosts';
import IPost from 'models/interfaces/IPost';
import { useState } from 'react';
import DatePiker from './DatePicker';

interface Props {
  open: boolean;
  postDetails: {
    post: IPost;
    pageId: string;
    pageAccessToken: string;
  };

  handleClose: () => void;
  handleSchedulePost: (model: IFacebookSchedulePost) => void;
}

const ScheduleModal = ({
  open,
  postDetails,
  handleClose,
  handleSchedulePost,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleSetSelectedDate = (unixDate: Date) => {
    setSelectedDate(dayjs(unixDate));
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: 1901 }}
    >
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '80%',
          }}
        >
          <Box>
            <Typography variant="h4" component="h2" my={5}>
              Schedule your post
            </Typography>

            <DatePiker handleSelectedDate={handleSetSelectedDate} />
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginBottom: '2rem',
              width: '50%',
            }}
            onClick={() => {
              const timestamp = Math.floor(selectedDate.valueOf() / 1000);

              const post: IFacebookSchedulePost = {
                ...postDetails,
                publishDate: timestamp,
              };

              handleSchedulePost(post);
              handleClose();
            }}
          >
            Done
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ScheduleModal;
