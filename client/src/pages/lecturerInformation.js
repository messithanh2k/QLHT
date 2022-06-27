import React from 'react';
import { Navigate } from 'react-router-dom';

import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';

import clsx from 'clsx';
import styles from './CSS/LecturerInformation.module.scss';

import Header from '../components/header';
import Footer from '../components/footer';
import UserInformation from '../components/userInformation';

function LecturerInformation() {
    const accessToken = TokenService.getLocalAccessToken();
    const role = RoleService.getLocalRole();

    if (!accessToken) {
        return <Navigate to="/lecturer/login" />;
    }
    if (role !== 'lecturer') {
        return <Navigate to={`/${role}/home`} />;
    }

    return (
        <div>
            <Header />
            <div className={clsx(styles.pageContent)}>
                <UserInformation user={{}} />
            </div>
            <Footer />
        </div>
    );
}

export default LecturerInformation;
