import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';

interface Props {
  handleSelectedDate: (unixDate: Date) => void;
}

export default function DatePiker({ handleSelectedDate }: Props) {
  const [open, setOpen] = useState(true);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['DateTimePicker']}> */}
      <DateTimePicker
        label="Choose a date"
        format="DD/MM/YYYY HH:mm"
        //value={value}
        onChange={(newValue: Date) => {
          handleSelectedDate(newValue);
          setOpen(false);
        }}
        disablePast={true}
        open={open}
        onError={(e) => {
          console.log(e);
        }}
      />
      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
}
