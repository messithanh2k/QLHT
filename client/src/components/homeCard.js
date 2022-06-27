import React from 'react';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

function HomeCard(props) {
    const title = props.title;
    const icon = props.icon;
    const des = props.description;

    return (
        <div>
            <h2>{title}</h2>
            {icon === 'profile' && <PermContactCalendarIcon />}
            <p>{des}</p>
        </div>
    );
}

export default HomeCard;
