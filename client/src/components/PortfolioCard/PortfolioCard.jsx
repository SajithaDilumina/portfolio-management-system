import React from 'react';
import { Card, CardContent, Typography, Divider, Avatar, Box, Button } from '@mui/material';
import { SCREEN_MODES } from '../../utilities/app.constants';

const PortfolioCard = ({ data ,handleRequest}) => {
    if (!data) {  // Check if data is null or undefined
        return <Typography>Loading...</Typography>; // Or any other placeholder
    }
    const { portfolio_name, bio, description, category, email, contact_no } = data;
    
    return (
        <Card sx={{ maxWidth: 500, m: "1rem", bgcolor: '#418ca3', minHeight: 545 }}> 
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Avatar sx={{ bgcolor: "#673ab7", width: "7rem", height: "7rem" }}>
                    {portfolio_name ? portfolio_name.charAt(0) : '?'}
            </Avatar> 
          </Box>
          <CardContent sx={{ textAlign: 'right', color: 'white' }}> 
              <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                  {portfolio_name || 'No Name'}  
              </Typography>
              <Divider variant="fullWidth" sx={{ my: 1, bgcolor: 'white' }} />
              <Typography variant="subtitle1" color="white" gutterBottom>
                  {bio || 'No Bio Available'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                  {description || 'No Description'}
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
                {category || 'No Category'}
              </Typography>
              <Divider variant="fullWidth" sx={{ my: 1, bgcolor: 'white' }} />
              <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
                  {email || 'No Email'}
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
                 {contact_no || 'No Contact Number'}
              </Typography>
          </CardContent>
          <Divider variant="fullWidth" sx={{ my: 1, bgcolor: 'white' }} />
          <Button variant="contained" onClick={()=>{handleRequest()}} sx={{ bgcolor: '#673ab7', color: 'white', margin: '3.5rem' }}>ADD New Feedback</Button>
        </Card>
    );
};

export default PortfolioCard;
