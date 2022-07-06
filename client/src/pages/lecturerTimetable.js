import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

import axios from 'axios';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';
import GmailService from '../service/GmailService';
import Header from '../components/header';
import Footer from '../components/footer';

const PREFIX = 'field';

const classes = {
    icon: `${PREFIX}-icon`,
    textCenter: `${PREFIX}-textCenter`,
    header: `${PREFIX}-header`,
};

const StyledGrid = styled(Grid)(() => ({
    [`&.${classes.textCenter}`]: {
        textAlign: 'center',
    },
}));

const Content = ({ children, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
        <Grid container alignItems="center">
            <StyledGrid item xs={2} className={classes.textCenter}>
                <LocationOnIcon fontSize="medium" color="primary" />
            </StyledGrid>
            <Grid item xs={10}>
                <span>{appointmentData.location}</span>
            </Grid>
        </Grid>
    </AppointmentTooltip.Content>
);

export default class LecturerTimetable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            currentDate: new Date(),
        };
        this.currentDateChange = (currentDate) => {
            this.setState({ currentDate });
        };
    }
    componentDidMount() {
        const email = GmailService.getLocalGmail();
        axios.post('http://localhost:3001/lecturer/timetable', { email: email }).then((res) => {
            console.log(res.data.data);
            const data = res.data.data;
            this.setState(() => ({
                data: data.map((raw_data, i) => ({
                    title: raw_data.name,
                    startDate: new Date(raw_data.year, raw_data.month - 1, raw_data.day, raw_data.StartTime, 0),
                    endDate: new Date(raw_data.year, raw_data.month - 1, raw_data.day, raw_data.EndTime, 0),
                    location: raw_data.Room,
                    id: i,
                })),
            }));
        });
        // fetch(`http://localhost:3001/lecturer/timetable/${email}`, {
        //     cache: 'no-cache',
        // })
        //     .then((res) => res.json())
        //     .then((data) =>
        //
        //     );
    }
    render() {
        const { data, currentDate } = this.state;
        return (
            <div>
                <Header />
                <Container maxWidth="lg" sx={{ mb: 5 }}>
                    <Paper>
                        <Scheduler data={data} height={1400}>
                            <ViewState currentDate={currentDate} onCurrentDateChange={this.currentDateChange} />
                            <WeekView startDayHour={6} endDayHour={19} />
                            <Toolbar />
                            <DateNavigator />
                            <TodayButton />
                            <Appointments />
                            <AppointmentTooltip contentComponent={Content} showCloseButton />
                        </Scheduler>
                    </Paper>
                </Container>
                <Footer />
            </div>
        );
    }
}
