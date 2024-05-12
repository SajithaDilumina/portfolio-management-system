import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';

const PostCard = ({ post ,handleNavigate}) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 ,maxHeight:500,minHeight:500 }}>
      <CardMedia
        component="img"
        height="140"
        image={post.image ? post.image.image : 'https://via.placeholder.com/140'}
        alt="Post image"
        style={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.portfolio_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description.length > 100 ? `${post.description.substring(0, 30)}...` : post.description}
        </Typography>
        <Typography variant="body1" color="primary">
          {`Category: ${post.category}`}
        </Typography>
        <Typography variant="body1">
          {`Contact: ${post.contact_no}`}
        </Typography>
        <Typography variant="body1">
          {`Email: ${post.email}`}
        </Typography>
        {post.promoCode && (
          <Typography variant="body1" style={{ color: 'green' }}>
            {`Promo Code: ${post.promoCode}`}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{handleNavigate(post._id,post.userID._id)}}  sx={{color:"#418ca3"}}>View Post</Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
