import { Card, CardMedia, IconButton } from '@mui/material';
import IPost from 'models/interfaces/IPost';
import CancelIcon from '@mui/icons-material/Cancel';

interface Props {
  post: IPost;
  onClose: () => void;
}

const SelectedImageCard = ({ post, onClose }: Props) => {
  return (
    <Card sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="140"
        image={post.imageUrl}
        alt="green"
      />
      <IconButton
        sx={{
          position: 'absolute',
          top: -10,
          right: -10,
          color: 'white',
        }}
        onClick={onClose}
      >
        <CancelIcon fontSize="large" />
      </IconButton>
    </Card>
  );
};

export default SelectedImageCard;
