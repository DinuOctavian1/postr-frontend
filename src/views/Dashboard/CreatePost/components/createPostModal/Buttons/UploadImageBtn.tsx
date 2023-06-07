import ImageIcon from '@mui/icons-material/Image';
import { IconButton } from '@mui/material';

const UploadImageBtn = () => {
  return (
    <IconButton
      color="warning"
      aria-label="upload picture"
      component="label"
      size={'large'}
    >
      <input hidden accept="image/*" type="file" />
      <ImageIcon sx={{ fontSize: '50px' }} />
    </IconButton>
  );
};

export default UploadImageBtn;
