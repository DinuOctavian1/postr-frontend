import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  id: string;
  colorInvert?: boolean;
}

const NavItem = ({
  title,
  id,

  colorInvert = false,
}: Props): JSX.Element => {
  const [fontWeight, setFontWeight] = useState(400);

  const handleClick = (event, id) => {
    setFontWeight(700);
  };

  const linkColor = colorInvert ? 'common.white' : 'text.primary';

  return (
    <Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        aria-describedby={id}
        sx={{ cursor: 'pointer' }}
        onClick={(e) => handleClick(e, id)}
      >
        <Typography fontWeight={fontWeight} color={linkColor}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default NavItem;
