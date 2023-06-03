import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import IFacebookPage from 'models/facebook/IFacebookPage';
import React, { useState } from 'react';
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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const PagesList = ({ pages, handleSetPageChange }: IProps) => {
  const [selectedPage, setSelectedPage] = useState<IFacebookPage>(pages[0]);

  useEffect(() => {
    setSelectedPage(pages[0]);
    handleSetPageChange(pages[0]);
  }, [pages]);

  const handle = (event: any) => {
    const page = pages.find((page) => page.name === event.target.value);
    setSelectedPage(() => page);
    console.log('selectedPage', selectedPage);
    handleSetPageChange(selectedPage);
  };

  return (
    // <Select
    //   labelId="page-label"
    //   id="selectedPage"
    //   defaultValue={pages[0]?.id}
    //   onChange={(event) => handle(event)}
    //   name="selectedPage"
    //   fullWidth
    // >
    //   {pages.map((page: IFacebookPage, index: number) => (
    //     <MenuItem key={index} value={page.id}>
    //       <Box display="flex" alignItems="center">
    //         <Avatar alt={page.name} src={page.iconUrl} />
    //         <Typography variant="body1" ml={2}>
    //           {page.name}
    //         </Typography>
    //       </Box>
    //     </MenuItem>
    //   ))}
    // </Select>
    <FormControl sx={{ m: 1, width: 800 }}>
      <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
      <Select
        id="selectedPage"
        value={selectedPage ? selectedPage.name : ''}
        onChange={(event) => handle(event)}
        name="selectedPage"
        input={<OutlinedInput id="select-multiple-chip" label="Page" />}
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
          <MenuItem
            key={index}
            value={page.name}
            //style={getStyles(name, personName, theme)}
          >
            {/* <Checkbox checked={false} /> */}
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
