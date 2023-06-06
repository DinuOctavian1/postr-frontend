import {
  Box,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import IFacebookPage from 'models/facebook/IFacebookPage';
import IGeneratePostRequest from 'models/request/ICreatePostRequest';
import { useState } from 'react';
import { PostNowBtn } from '../postForm/buttons';
import ScheduleBtn from '../postForm/buttons/SchedultBtn';
import { PostForm } from '../postForm/PostForm';
import FacebookPostPreview from '../postPreview/FacebookPostPreview';
import ScheduleModal from '../schedule/ScheduleModal';
import { PagesList } from '../selectPages/PagesList';
import CloseIcon from '@mui/icons-material/Close';

interface CreatePostModalProps {
  open: boolean;
  handleClose: () => void;
  pages: IFacebookPage[];
  handleSetPage: (page: IFacebookPage) => void;
  post: string;
  generatedPost: string;
  isGeneratedPostLoading: boolean;
  handlePostNow: (
    text: string,
    pageId: string,
    pageAccessToken: string,
  ) => void;
  selectedPage: IFacebookPage;
  isLoading: boolean;
  isScheduleBtnLoading: boolean;
  handleSchedulePost: (
    text: string,
    pageId: string,
    pageAccessToken: string,
    timestamp: number,
  ) => void;
  handleSetPost: (post: string) => void;
  handleGeneratePost: (data: IGeneratePostRequest) => void;
}

const style = {
  position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: '95%',
  height: '95%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreatePostModal = ({
  open,
  handleClose,
  pages,
  handleSetPage,
  post,
  generatedPost,
  isGeneratedPostLoading,
  handlePostNow,
  selectedPage,
  isLoading,
  isScheduleBtnLoading,
  handleSchedulePost,
  handleSetPost,
  handleGeneratePost,
}: CreatePostModalProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Modal
        open={open}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <>
          <Box sx={{ position: 'absolute', top: 0, right: 0, p: 1 }}>
            <IconButton onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={style}>
            <Typography
              variant="h5"
              id="modal-modal-title"
              component="h2"
              gutterBottom
            >
              Create Post
            </Typography>
            <Divider />
            <Grid container spacing={2} mt={3}>
              <Grid item xs={12} md={7}>
                <Box mb={1}>
                  <Typography
                    variant="h6"
                    id="modal-modal-title"
                    component="h2"
                  >
                    Publish to:
                  </Typography>
                </Box>
                <PagesList pages={pages} handleSetPageChange={handleSetPage} />
                <Box mt={5}>
                  <PostForm
                    post={post}
                    generatedPost={generatedPost}
                    selectedPage={selectedPage}
                    isGeneratedPostLoading={isGeneratedPostLoading}
                    handleGeneratePost={handleGeneratePost}
                    handleSetPost={handleSetPost}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box mb={1} display={'flex'} justifyContent={'center'}>
                  <FacebookPostPreview
                    post={post}
                    iconUrl={selectedPage?.iconUrl}
                    name={selectedPage?.name}
                  />
                </Box>
                <Box mt={5} display={'flex'} justifyContent={'space-evenly'}>
                  <PostNowBtn
                    isLoading={isLoading}
                    handleClick={() =>
                      handlePostNow(
                        post,
                        selectedPage.id,
                        selectedPage.access_token,
                      )
                    }
                  />
                  <ScheduleBtn
                    isLoading={isScheduleBtnLoading}
                    handleClick={() => setOpenModal(true)}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      </Modal>
      <ScheduleModal
        open={openModal}
        post={{
          text: post,
          pageId: selectedPage?.id,
          pageAccessToken: selectedPage?.access_token,
        }}
        handleClose={() => setOpenModal(false)}
        handleSchedulePost={handleSchedulePost}
      />
    </>
  );
};

export default CreatePostModal;
