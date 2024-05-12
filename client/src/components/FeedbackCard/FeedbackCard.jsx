import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import moment from 'moment';

const FeedbackCard = ({ feedback }) => {
    const { name, email, comments, createdAt } = feedback;

    return (
        <Card sx={{ marginBottom: 2, maxWidth:545, flexDirection: 'row', borderRadius:"0.8rem" , background:"#418ca3"}}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center', 
                padding: 2, 
                backgroundColor:"#5aa6bd"
            }}>
                <Box sx={{ textAlign: 'right', flexGrow: 1 }}>
                    <Typography variant="h6" color="white" sx={{fontWeight:"600"}}>{name}</Typography>
                    <Typography variant="body2"  color="white" sx={{fontWeight:"600"}}>{email}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: deepPurple[500], marginLeft: 2 }}>
                    {name.charAt(0)}
                </Avatar>
            </Box>
            <CardContent>
                <Typography variant="h6" color="white" sx={{ textAlign:"left",fontWeight:"600"}} gutterBottom>
                    Comment
                </Typography>
                <Typography variant="body2" color="white" sx={{ textAlign:"left"}} gutterBottom>
                    {comments ? `${comments}` : 'No comments provided'}
                </Typography>
                <Typography variant="caption" color="white" display="block">
                    {createdAt ? `Created At: ${moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}` : 'No date provided'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default FeedbackCard;
