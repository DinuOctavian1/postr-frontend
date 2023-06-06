import { LoadingButton } from '@mui/lab';

interface Props {
  isLoading: boolean;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GeneratePostBtn = ({ isLoading, handleClick }: Props) => {
  return (
    <LoadingButton
      variant="contained"
      type="submit"
      loading={isLoading}
      color="secondary"
      sx={{ fontWeight: 'bold' }}
      onClick={handleClick}
    >
      Generate AI Content
    </LoadingButton>
  );
};

export default GeneratePostBtn;
