import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, IconButton } from '@mui/material';
import { useEffect } from 'react';

interface Props {
  handleUploadFile: (file: FormData) => void;
  handleSetPost: (post: any) => void;
  fileUrl?: string;
}

const UploadImageBtn = ({
  handleUploadFile,
  handleSetPost,
  fileUrl,
}: Props) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    handleUploadFile(formData);
  };

  useEffect(() => {
    if (fileUrl) {
      handleSetPost({ imageUrl: fileUrl });
    }
  }, [fileUrl]);

  return (
    <Box
      width={140}
      height={140}
      component="label"
      display="flex"
      justifyContent="center"
      border="dashed"
      borderRadius={0.1}
      borderColor="primary.main"
      p={1}
      //sx={{ borderWidth: '2px', cursor: 'pointer' }}
      sx={{
        borderWidth: '2px',
        cursor: 'pointer',
      }}
    >
      <IconButton
        color="warning"
        aria-label="upload picture"
        component="label"
        size={'large'}
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
            color: 'primary',
          },
        }}
      >
        <input hidden accept="image/*" type="file" onInput={handleFileUpload} />
        <ImageIcon sx={{ fontSize: '90px' }} />
      </IconButton>
    </Box>
  );
};

export default UploadImageBtn;
