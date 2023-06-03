import { Box, Divider, Modal, Typography } from '@mui/material';
import IFacebookPage from 'models/facebook/IFacebookPage';
import FacebookService from 'services/FacebookService';
import { PagesList } from '../selectPages/PagesList';

interface CreatePostModalProps {
  pages: IFacebookPage[];
  handleSetPage: (page: IFacebookPage) => void;
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

const CreatePostModal = ({ pages, handleSetPage }: CreatePostModalProps) => {
  return (
    <>
      <Modal
        open={true}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={style}>
          <Typography variant="h6" id="modal-modal-title" component="h2">
            Create Post
          </Typography>
          <Divider />
          <Typography variant="h6" id="modal-modal-title" component="h2">
            Publish to:
          </Typography>
          <PagesList pages={pages} handleSetPageChange={handleSetPage} />
        </Box>
      </Modal>
    </>
  );
};

export default CreatePostModal;
