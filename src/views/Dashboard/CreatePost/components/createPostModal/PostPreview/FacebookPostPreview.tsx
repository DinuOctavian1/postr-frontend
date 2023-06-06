import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ReplyIcon from '@mui/icons-material/ReplyOutlined';

import { Skeleton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

interface Props {
  post: string;
  iconUrl: string;
  name: string;
  imageUrl?: string;
}

const FacebookPostPreview = ({
  post,
  iconUrl,
  name,
  imageUrl = null,
}: Props) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const cardStyle = {
    width: isMd ? 400 : 300,
  };

  return (
    <Box>
      <Box display={'inline-flex'} alignItems={'center'} mb={2}>
        <FacebookIcon />
        <Typography variant="h6" textAlign={'left'} ml={1}>
          Facebook
        </Typography>
      </Box>
      <Card sx={cardStyle}>
        <Paper elevation={3} />
        <CardHeader
          avatar={
            iconUrl ? (
              <Avatar>
                <img src={iconUrl} alt={name} />
              </Avatar>
            ) : (
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                animation={'wave'}
              />
            )
          }
          action={
            <IconButton aria-label="settings">
              <MoreHoriz />
            </IconButton>
          }
          title={name === null ? <Skeleton animation={'wave'} /> : name}
          subheader={
            name === null ? (
              <Skeleton animation={'wave'} width={'30%'} />
            ) : (
              'Just now'
            )
          }
        />
        {!imageUrl ? (
          <Skeleton
            sx={{ height: 270 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            component="img"
            height="140"
            image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
            alt="Nicola Sturgeon on a TED talk stage"
          />
        )}
        <CardContent>
          {!post ? (
            <Box>
              <Skeleton animation={'wave'} />
              <Skeleton animation={'wave'} sx={{ width: 200 }} />
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {post}
            </Typography>
          )}
        </CardContent>

        <CardActions
          disableSpacing
          sx={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <Box display={'inline-flex'} alignItems={'center'}>
            <IconButton aria-label="add to favorites">
              <ThumbUpAltIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              Like
            </Typography>
          </Box>
          <Box display={'inline-flex'} alignItems={'center'}>
            <IconButton aria-label="add to favorites">
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              Comment
            </Typography>
          </Box>
          <Box display={'inline-flex'} alignItems={'center'}>
            <IconButton aria-label="add to favorites">
              <ReplyIcon sx={{ transform: 'scaleX(-1)' }} />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              Share
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default FacebookPostPreview;
