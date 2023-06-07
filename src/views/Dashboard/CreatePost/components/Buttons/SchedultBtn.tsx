import { LoadingButton } from '@mui/lab';

interface Props {
  isLoading: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

const ScheduleBtn = ({ isLoading, handleClick, disabled = false }: Props) => {
  return (
    <LoadingButton
      disabled={disabled}
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
