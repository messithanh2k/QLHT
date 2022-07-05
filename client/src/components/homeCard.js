import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './CSS/HomeCardCSS.module.scss';

import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';

function HomeCard(props) {
    const link = props.link;
    const title = props.title;
    const icon = props.icon;
    const des = props.description;

    return (
        <div className={clsx(styles.cardContainer)}>
            <div className={clsx(styles.cardBody)}>
                <Link to={link}>
                    <div className={clsx(styles.cardContent)}>
                        <h2 className={clsx(styles.cardTitle)}>{title}</h2>
                        <div className={clsx(styles.iconContainer)}>
                            {' '}
                            {icon === 'profile' && (
                                <PermContactCalendarOutlinedIcon className={clsx(styles.cardIcon)} />
                            )}
                            {icon === 'news' && <CampaignOutlinedIcon className={clsx(styles.cardIcon)} />}
                            {icon === 'classes' && <ClassOutlinedIcon className={clsx(styles.cardIcon)} />}
                            {icon === 'calender' && <CalendarMonthOutlinedIcon className={clsx(styles.cardIcon)} />}
                        </div>
                        <p className={clsx(styles.cardDescription)}>{des}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default HomeCard;
