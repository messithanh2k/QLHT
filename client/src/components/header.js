import React from 'react';
import styles from './CSS/HeaderCSS.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import logo from '../assets/images/hust-logo.jpeg';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Header(props) {
    const role = props.role;
    return (
        <div className={clsx(styles.headerContainer)}>
            <Box className={clsx(styles.headerTop)}>
                <div className={clsx(styles.headerTitle)}>
                    <img className={clsx(styles.logoImg)} src={logo} alt="HUST" />
                    <div>
                        <h1 className={clsx(styles.mainTitle)}>HỆ THỐNG QUẢN TRỊ ĐẠI HỌC TRỰC TUYẾN</h1>
                        <h2 className={clsx(styles.subTitle)}>
                            TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI - TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG
                        </h2>
                    </div>
                </div>
                <div>
                    {role === '' && (
                        <Button className={clsx(styles.loginButton)} variant="outlined">
                            LOGIN
                        </Button>
                    )}
                </div>
            </Box>
            <Box className={clsx(styles.headerBottom)}>
                <Link to="/" className={clsx(styles.headerTab)}>
                    TRANG CHỦ
                </Link>
                <Link to="/" className={clsx(styles.headerTab)}>
                    ĐỒ ÁN
                </Link>
                <Link to="/" className={clsx(styles.headerTab)}>
                    LỊCH HỌC
                </Link>
                <Link to="/" className={clsx(styles.headerTab)}>
                    NCKH
                </Link>
                <Link to="/" className={clsx(styles.headerTab)}>
                    BIỂU MẪU
                </Link>
                <Link to="/" className={clsx(styles.headerTab)}>
                    HỎI ĐÁP
                </Link>
            </Box>
        </div>
    );
}

export default Header;
