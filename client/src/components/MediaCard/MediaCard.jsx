import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const MediaCard = ({ media, handleLike, handleDislike }) => {
    console.log("meadia",media)
    return (
        <Card sx={{ minWidth: 345, maxWidth: 345,  m: 2,  }}>
            {media.type === 'Image' ? (
                <CardMedia
                    style={{  objectFit: 'fill', height:250 }}
                    component="img"
                    height="10"
                    src={media.content}
                    alt={media.description}
                />
            ) : (
                <CardMedia
                    component="iframe"
                    height="250"
                    src={media.content}
                    title={media.title}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h5"  sx={{ fontSize:"2rem",fontWeight:900}}component="div">
                    {media.title}
                </Typography>
                <Typography variant="body2" sx={{ fontSize:"1rem",fontWeight:600}}>
                    {media.description}
                </Typography>

                <div style={{display:"flex",alignContent:"center",justifyItems:"center"}}>
                <Typography sx={{fontSize:"1.1rem",fontWeight:800}}>
                    Category: 
                </Typography>
                <Typography sx={{fontSize:"1rem",fontWeight:600,m:.4}}>
                   {media.category}
                </Typography>
                </div>
             
            </CardContent>
            <CardActions sx={{ justifyContent:"space-evenly",margin:"1rem"}}>
                <Button size="small" sx={{color:"#3A7D90"}} onClick={() => handleLike(media._id)}>
                    <ThumbUpAltIcon sx={{color:"#3A7D90"}} /> Like ({media.likes.length})
                </Button>
                <Button size="small" sx={{color:"#3A7D90"}} onClick={() => handleDislike(media._id)}>
                    <ThumbDownAltIcon  sx={{color:"#3A7D90"}}/> Dislike ({media.dislikes.length})
                </Button>
            </CardActions>
        </Card>
    );
};

export default MediaCard;
