import React from 'react';
import styles from './CSS/HeaderCSS.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import avatarSample from '../assets/images/avatar_sample.jpg';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import logo from '../assets/images/hust-logo.jpeg';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header() {
    const [accessToken, setAccessToken] = useState(TokenService.getLocalAccessToken());
    const [role, setRole] = useState(RoleService.getLocalRole());
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        TokenService.removeLocalAccessToken(RoleService.getLocalRole());
        RoleService.removeLocalRole();
        setAccessToken(TokenService.getLocalAccessToken());
        setRole(RoleService.getLocalRole());
        setAnchorEl(null);
        navigate('/');
    };

    const handleClickInfo = () => {
        setAnchorEl(null);
        navigate(`/${role}/information`);
    };
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
                    {!accessToken && (
                        <Link className={clsx(styles.loginLink)} to="/student/login">
                            <Button className={clsx(styles.loginButton)} variant="outlined">
                                LOGIN
                            </Button>
                        </Link>
                    )}

                    {accessToken && (
                        <div>
                            <Avatar
                                alt="avatar"
                                src={avatarSample}
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            ></Avatar>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClickInfo}>Thông tin cá nhân</MenuItem>
                                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                            </Menu>
                        </div>
                    )}
                </div>
            </Box>
            {!role && (
                <Box className={clsx(styles.headerBottom)}>
                    <Link to="/lecturer/login" className={clsx(styles.headerTab)}>
                        GIẢNG VIÊN
                    </Link>
                    <Link to="/student/login" className={clsx(styles.headerTab)}>
                        SINH VIÊN
                    </Link>
                    <Link to="/" className={clsx(styles.headerTab)}>
                        LIÊN HỆ
                    </Link>
                </Box>
            )}
            {role === 'student' && (
                <Box className={clsx(styles.headerBottom)}>
                    <Link to="/student/home" className={clsx(styles.headerTab)}>
                        TRANG CHỦ
                    </Link>
                    <Link to="/student/result" className={clsx(styles.headerTab)}>
                        KẾT QUẢ HỌC TẬP
                    </Link>
                    <Link to="/student/timetable" className={clsx(styles.headerTab)}>
                        LỊCH HỌC
                    </Link>
                    <Link to="/student/registerclass" className={clsx(styles.headerTab)}>
                        ĐĂNG KÝ HỌC TẬP
                    </Link>
                    <Link to="/student/eduprogram" className={clsx(styles.headerTab)}>
                        CHƯƠNG TRÌNH ĐÀO TẠO
                    </Link>
                    <Link to="/" className={clsx(styles.headerTab)}>
                        BIỂU MẪU
                    </Link>
                    <Link to="/" className={clsx(styles.headerTab)}>
                        HỎI ĐÁP
                    </Link>
                </Box>
            )}
            {role === 'lecturer' && (
                <Box className={clsx(styles.headerBottom)}>
                    <Link to="/lecturer/home" className={clsx(styles.headerTab)}>
                        TRANG CHỦ
                    </Link>
                    <Link to="/" className={clsx(styles.headerTab)}>
                        GIẢNG DẠY
                    </Link>
                    <Link to="/" className={clsx(styles.headerTab)}>
                        LỊCH CÔNG TÁC
                    </Link>
                    <Link to="/" className={clsx(styles.headerTab)}>
                        NCKH
                    </Link>
                </Box>
            )}
            {role === 'admin' && (
                <Box className={clsx(styles.headerBottom)}>
                    <Link to="/home/admin" className={clsx(styles.headerTab)}>
                        TRANG CHỦ
                    </Link>
                    <Link to="/" className={clsx(styles.headerTab)}>
                        GIẢNG VIÊN
                    </Link>
                    <Link to="/" className={clsx(styles.headerTab)}>
                        SINH VIÊN
                    </Link>
                </Box>
            )}
        </div>
    );
}

export default Header;
