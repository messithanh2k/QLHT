import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';
import HomeCard from '../components/homeCard';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { Navigate } from 'react-router-dom';

function LecturerHome() {
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

            <HomeCard
                title="Hồ sơ giảng viên"
                icon="profile"
                description="Các thông tin cá nhân, địa chỉ, số điện thoại liên lạc của giảng viên"
            ></HomeCard>
            <Footer />
        </div>
    );
}

export default LecturerHome;
