import { LoadingButton } from '@mui/lab';

interface Props {
  isLoading: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ScheduleBtn = ({ isLoading, handleClick }: Props) => {
  return (
    <LoadingButton
      variant="contained"
      type="submit"
      loading={isLoading}
      color="primary"
      onClick={handleClick}
    >
      Schedule for later
    </LoadingButton>
  );
};

export default ScheduleBtn;
