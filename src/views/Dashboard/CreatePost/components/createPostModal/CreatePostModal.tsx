import { useEffect, useState } from 'react';

import {
  Box,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import IFacebookPage from 'models/facebook/IFacebookPage';
import IGeneratePostRequest from 'models/request/ICreatePostRequest';
import IPost from 'models/interfaces/IPost';
import IFBPostRequest from 'models/request/facebook/IFBPostRRequest';
import IFacebookSchedulePost from 'models/request/facebook/IFacebookSchedulePosts';

import { PostNowBtn } from './Buttons';
import ScheduleBtn from './Buttons/SchedultBtn';
import UploadImageBtn from './Buttons/UploadImageBtn';

import { GeneratePostForm } from './GeneratePostForm/GeneratePostForm';
import FacebookPostPreview from './PostPreview/FacebookPostPreview';
import ScheduleModal from './Schedule/ScheduleModal';
import { SelectPage } from './SelectPage/SelectPage';
import SelectedImageCard from './SelectedImageCard/SelectedImageCard';

interface CreatePostModalProps {
  handleUploadFile: (file: FormData) => void;
  fileUrl: string;
  isFileLoading: boolean;
  open: boolean;
  handleClose: () => void;
  pages: IFacebookPage[];
  handleSetPage: (page: IFacebookPage) => void;
  post: IPost;
  generatedPost: string;
  isGeneratedPostLoading: boolean;
  handlePostNow: (postModel: IFBPostRequest) => void;
  selectedPage: IFacebookPage;
  isPostBtnLoading: boolean;
  isScheduleBtnLoading: boolean;
  handleSchedulePost: (model: IFacebookSchedulePost) => void;
  handleSetPost: (post: IPost) => void;
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
  handleUploadFile,
  fileUrl,
  isFileLoading,
  open,
  handleClose,
  pages,
  handleSetPage,
  post,
  generatedPost,
  isGeneratedPostLoading,
  handlePostNow,
  selectedPage,
  isPostBtnLoading,
  isScheduleBtnLoading,
  handleSchedulePost,
  handleSetPost,
  handleGeneratePost,
}: CreatePostModalProps) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openModal, setOpenModal] = useState(false);
  const [showSelectedImage, setShowSelectedImage] = useState(false);

  const handleSelectedImageOnClose = () => {
    setShowSelectedImage(false);
    handleSetPost({ ...post, imageUrl: '' });
  };

  useEffect(() => {
    if (post.imageUrl !== '') {
      setShowSelectedImage(true);
    }
  }, [post.imageUrl]);

  return (
    <>
      <Modal
        open={open}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <>
          <Box sx={style}>
            <Box sx={{ position: 'absolute', top: 0, right: 0, p: 1 }}>
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography
              variant="h5"
              id="modal-modal-title"
              component="h2"
              gutterBottom
            >
              Create Post
            </Typography>
            <Divider />
            <Box sx={{ maxHeight: 'calc(100vh - 150px)', overflow: 'auto' }}>
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

                  <SelectPage
                    pages={pages}
                    handleSetPageChange={handleSetPage}
                  />

                  <Box mt={5} mb={3}>
                    <GeneratePostForm
                      post={post.text}
                      generatedPost={generatedPost}
                      selectedPage={selectedPage}
                      isGeneratedPostLoading={isGeneratedPostLoading}
                      handleGeneratePost={handleGeneratePost}
                      handleSetPost={handleSetPost}
                    />
                  </Box>
                  <Divider />
                  <Box
                    mt={3}
                    display="flex"
                    flexDirection={'row'}
                    width={!isMd ? '50%' : '30%'}
                    justifyContent={'space-between'}
                  >
                    <Box>
                      <UploadImageBtn
                        handleUploadFile={handleUploadFile}
                        fileUrl={fileUrl}
                        handleSetPost={handleSetPost}
                      />
                    </Box>
                    {showSelectedImage && (
                      <SelectedImageCard
                        post={post}
                        onClose={handleSelectedImageOnClose}
                      />
                    )}
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
                      isLoading={isPostBtnLoading}
                      handleClick={() => {
                        const postModel: IFBPostRequest = {
                          text: post.text,
                          pageId: selectedPage.id,
                          pageAccessToken: selectedPage.access_token,
                          mediaUrl: post?.imageUrl,
                        };
                        handlePostNow(postModel);
                      }}
                      disabled={post?.text === ''}
                    />
                    <ScheduleBtn
                      isLoading={isScheduleBtnLoading}
                      handleClick={() => setOpenModal(true)}
                      disabled={post?.text === ''}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      </Modal>
      <ScheduleModal
        open={openModal}
        postDetails={{
          post,
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
