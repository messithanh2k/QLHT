import React from 'react';
import styles from './CSS/FooterCSS.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import footerImg from '../assets/images/hust-footer.jpeg';
import Box from '@mui/material/Box';

function Footer() {
    return (
        <div className={clsx(styles.footerContainer)}>
            <h1 className={clsx(styles.footerTitle)}>
                HỆ THỐNG DO TRƯỜNG TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI THIẾT KẾ & PHÁT TRIỂN.
            </h1>
        </div>
    );
}

export default Footer;
