import { LoadingButton } from '@mui/lab';
import FacebookIcon from '@mui/icons-material/Facebook';

interface Props {
  isLoading: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

const PostNowBtn = ({ isLoading, handleClick, disabled = false }: Props) => {
  return (
    <LoadingButton
      startIcon={<FacebookIcon />}
      size="large"
      variant="contained"
      color="primary"
      loading={isLoading}
      type="submit"
      onClick={handleClick}
      disabled={disabled}
    >
      Post Now
    </LoadingButton>
  );
};

export default PostNowBtn;
