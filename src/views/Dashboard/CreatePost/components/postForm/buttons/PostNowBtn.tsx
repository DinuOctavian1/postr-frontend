import { LoadingButton } from '@mui/lab';
import FacebookIcon from '@mui/icons-material/Facebook';
import BtnType from './BtnType';

interface Props {
  isLoading: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PostNowBtn = ({ isLoading, handleClick }: Props) => {
  return (
    <LoadingButton
      startIcon={<FacebookIcon />}
      size="large"
      variant="contained"
      color="primary"
      loading={isLoading}
      type="submit"
      name={BtnType.POST}
      onClick={handleClick}
    >
      Post Now
    </LoadingButton>
  );
};

export default PostNowBtn;
