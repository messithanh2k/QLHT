import React from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import GmailService from '../service/GmailService';
import clsx from 'clsx';
import styles from './CSS/LecturerInformation.module.scss';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import UserInformation from '../components/userInformation';

function LecturerInformation() {
    const accessToken = TokenService.getLocalAccessToken();
    const role = RoleService.getLocalRole();
    const email = GmailService.getLocalGmail();
    const [user, setUser] = useState({});

    const handleUpdate = async (phone, password, avatarUrl) => {
        console.log(password, phone, email);

        return true;
    };

    useEffect(() => {
        axios
            .post('http://localhost:3001/lecturer/profile', { email: email })
            .then((res) => {
                // console.log(res);
                const data = res.data.data;
                const lec = {
                    avatarImg: data.avatarUrl,
                    fullName: data.FullName,
                    email: data.Email,
                    gender: data.Sex,
                    born: data.Born,
                    identityNumber: data.IdentityNumber,
                    birthday: data.DateOfBirth,
                    phone: data.PhoneNumber,
                };
                setUser(lec);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                <UserInformation user={user} onUpdate={handleUpdate} />
            </div>
            <Footer />
        </div>
    );
}

export default LecturerInformation;
