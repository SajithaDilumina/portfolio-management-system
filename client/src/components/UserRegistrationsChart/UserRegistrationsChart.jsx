import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";


const UserRegistrationsChart = ({ data }) => {
    const labels = data.map((item) => item.date);
    const counts = data.map((item) => item.count);
    const options = {
        series: [{
          data: counts
        }],
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: false,
          }
        },
        dataLabels: {
            color: "white",
          enabled: false
        },
        
        xaxis: {
          categories: labels,
        }
      };
    
  
  return (
    <Grid item xs={12} md={6} sx={{alignItems:'center', justifyContent:"center",margin:"4rem"}}>
    <Grid item xs={6} md={6}>
        <Card sx={{width:"100%",background:"#5aa6bd"}}>
      <CardContent>
        <Typography variant="h5" sx={{color:"white"}} component="div" mb={2}>
          User Registrations Chart
        </Typography>
        <Chart options={options} series={options.series} type="bar" height={350} />

        <Box>
        </Box>
      </CardContent>
    </Card>
    </Grid>
    </Grid>
  );
};

export default UserRegistrationsChart;
