import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';
import { YearPicker } from '@mui/x-date-pickers/YearPicker';

import { Grid,Box, Card, CardContent, CardHeader,  Typography, useTheme,CardActions,Button } from '@mui/material';


const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

 const Card_Calendar = (props) => { 
  const [date, setDate] = React.useState(new Date());

  return (
	<Card {...props}>
  
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        <Grid fullwidth item xs={12} md={12}>
          <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
        </Grid>
        
        
      </Grid>
    </LocalizationProvider>
	
	</Card>
  );
}

export default Card_Calendar