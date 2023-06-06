import {
  Avatar,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import IFacebookPage from 'models/facebook/IFacebookPage';
import { useState } from 'react';
import { useEffect } from 'react';

interface IProps {
  pages: IFacebookPage[];
  handleSetPageChange: (page: IFacebookPage) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const SelectPage = ({ pages, handleSetPageChange }: IProps) => {
  const [selectedPage, setSelectedPage] = useState<IFacebookPage>(pages[0]);

  useEffect(() => {
    setSelectedPage(pages[0]);
    handleSetPageChange(pages[0]);
  }, [pages]);

  useEffect(() => {
    handleSetPageChange(selectedPage);
  }, [selectedPage]);

  const handle = (event: any) => {
    const page = pages.find((page) => page.name === event.target.value);
    setSelectedPage(() => page);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
      <Select
        id="selectedPage"
        value={selectedPage ? selectedPage.name : ''}
        onChange={handle}
        name="selectedPage"
        input={<OutlinedInput id="select-multiple-chip" label="Page" />}
        fullWidth
        renderValue={() =>
          selectedPage && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Chip
                key={selectedPage.id}
                label={selectedPage.name}
                icon={<FacebookIcon />}
                onDelete={() => setSelectedPage(null)}
                onMouseDown={(event) => event.stopPropagation()}
              />
            </Box>
          )
        }
        MenuProps={MenuProps}
      >
        {pages.map((page: IFacebookPage, index: number) => (
          <MenuItem key={index} value={page.name}>
            <Avatar
              alt={page.name}
              src={page.iconUrl}
              sx={{ marginRight: '1rem' }}
            />
            {page.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
