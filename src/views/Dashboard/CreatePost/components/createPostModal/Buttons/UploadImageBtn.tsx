import ImageIcon from '@mui/icons-material/Image';
import { IconButton } from '@mui/material';
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
    <IconButton
      color="warning"
      aria-label="upload picture"
      component="label"
      size={'large'}
    >
      <input hidden accept="image/*" type="file" onInput={handleFileUpload} />
      <ImageIcon sx={{ fontSize: '50px' }} />
    </IconButton>
  );
};

export default UploadImageBtn;
