import { LoadingButton } from '@mui/lab';
import BtnType from './BtnType';

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
      sx={{ fontWeight: 'bold' }}
      name={BtnType.SCHEDULE}
      onClick={handleClick}
    >
      Schedule
    </LoadingButton>
  );
};

export default ScheduleBtn;
