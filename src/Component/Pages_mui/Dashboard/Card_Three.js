import React,{ useState,useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { Box, Card, CardContent, CardHeader,  Typography, useTheme,CardActions,Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import moment from "moment";

ChartJS.register(ArcElement, Tooltip, Legend);
 const TrafficByDevice = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [summary, setDataSummary] = useState([]);
  const newDate = moment(new Date()).format('MMM YYYY')	
  useEffect(() => {
		GetData()
    },[]);
  
  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
  const GetData = async () => {
		try {
			
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_attendance_this_month';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
				
			});
			
			setDataSummary(response.data)
			
		} catch (e) {
			console.log(e)
		}
	}
  
  const datavalue=summary.map(r => r.val)
  const datacolor=summary.map(r => r.color)
  const datalabels=summary.map(r => r.title)
  const data = {
    datasets: [
      {
        data: datavalue,
        backgroundColor: datacolor,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: datalabels
  };
  return (
    <Card {...props}>
      <CardHeader title={"Attendance "+newDate} />
     
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {summary.map(({
            color,
            title,
            val
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {val}
               
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
	  <CardActions disableSpacing>
		<Button size="small" color="primary" onClick={()=>navigate("/my/attendance")}>
			More Details
		</Button>
				
	  </CardActions>
    </Card>
  );
};

export default TrafficByDevice