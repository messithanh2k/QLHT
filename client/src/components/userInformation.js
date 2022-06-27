import React, { useEffect, useState, memo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './CSS/UserInformationCSS.module.scss';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ImageUploader from '../components/imageUploader';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defautlAvatar =
    'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png';

function UserInformation(props) {
    const role = RoleService.getLocalRole();
    const accessToken = TokenService.getLocalAccessToken();
    const user = props.user;
    const [avatarImg, setAvatarImg] = useState(user.avatarImg || defautlAvatar);
    const sid = user.SID;
    const [fullName, setFullName] = useState(user.fullName);
    const email = user.email;
    const [gender, setGender] = useState(user.sex);
    const [birthday, setBirthday] = useState(user.dateOfBirth);
    const schoolYear = user.schoolYear;
    const classs = user.classs;
    const major = user.major;
    const [born, setBorn] = useState(user.born);
    const [identityNumber, setIdentityNumber] = useState(user.identityNumber);
    const [phone, setPhone] = useState(user.PhoneNumber);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState({
        type: 'info',
        message: '',
    });

    const [open, setOpen] = useState(false);

    const [success, setSuccess] = useState(false);

    //console.log(avatarImg);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setErrMsg({
            type: 'info',
            message: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password && !password) {
            if (password !== confirmPassword) {
                setErrMsg('Mật khẩu không khớp!');
            }
            if (password.length < 6) {
                setErrMsg('Mật khẩu phải chứa ít nhất 6 kí tự!');
            }
        }

        if (errMsg.message === '') {
            // //console.log(avatarImg);
            // let data = {};
            // // console.log('submit');
            // const bday = new Date(birthday);
            // if (role === 'customer') {
            //     data = {
            //         email: email,
            //         fullName: fullName,
            //         lastName: lastName,
            //         phoneNumber: phone,
            //         gender: gender,
            //         dateOfBirth: bday,
            //         address: address,
            //         password: password,
            //         avatarUrl: avatarImg,
            //     };
            // } else {
            //     const iday = new Date(ngayCap);
            //     data = {
            //         email: email,
            //         fullName: fullName,
            //         lastName: lastName,
            //         phoneNumber: phone,
            //         gender: gender,
            //         dateOfBirth: bday,
            //         address: address,
            //         password: password,
            //         avatarUrl: avatarImg,
            //         cccd: cmnd,
            //         issueDate: iday,
            //         issuePlace: noiCap,
            //     };
            // }
            // //console.log(data);
            try {
                //callback funtion
                setSuccess(true);
            } catch (err) {
                setErrMsg({ type: 'error', message: err });
                //console.log(err);
                setOpen(true);
            }
        }
    };

    useEffect(() => {
        if (errMsg.message !== '') {
            setOpen(true);
        }
    }, [errMsg]);

    useEffect(() => {
        if (success === true) {
            setErrMsg({ type: 'success', message: 'Cập nhật thành công.' });
            setOpen(true);
        }
    }, [success]);

    return (
        <div className={clsx(styles.registerContainer, styles.row)}>
            <div
                className={errMsg ? clsx(styles.snackbar, styles.show) : clsx(styles.snackbar, styles.offscreen)}
                aria-live="assertive"
            >
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={errMsg.type} sx={{ width: '100%' }}>
                        {errMsg.message}
                    </Alert>
                </Snackbar>
            </div>
            <div className={clsx(styles.UserInformation)}>
                <form onSubmit={handleSubmit} className={clsx(styles.row)}>
                    <div className={clsx(styles.row, styles.formRow)}>
                        <div className={clsx(styles.formLeft)}>
                            <div className={clsx(styles.formRow, styles.row)}>
                                {role === 'student' && (
                                    <div className={clsx(styles.formField, styles.col3)}>
                                        <label htmlFor="sid" className={clsx(styles.formLabel, styles.row)}>
                                            Mã sinh viên:
                                        </label>
                                        <input
                                            id="sid"
                                            name="sid"
                                            value={sid}
                                            type="text"
                                            className={clsx(styles.formInput, styles.row)}
                                            disabled
                                        />
                                    </div>
                                )}
                                <div className={clsx(styles.formField, styles.col3)}>
                                    <label htmlFor="fullName" className={clsx(styles.formLabel, styles.row)}>
                                        Họ và tên:
                                    </label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        type="text"
                                        className={clsx(styles.formInput, styles.row)}
                                        placeholder="Họ và tên..."
                                        required
                                    />
                                </div>

                                <div className={clsx(styles.formField, styles.col3)}>
                                    <label htmlFor="email" className={clsx(styles.formLabel, styles.row)}>
                                        Email:
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        className={clsx(styles.formInput, styles.row)}
                                        disabled
                                    />
                                </div>
                                <div className={clsx(styles.formField, styles.col3)}>
                                    <label htmlFor="identityNumber" className={clsx(styles.formLabel, styles.row)}>
                                        CMND/CCCD:
                                    </label>
                                    <input
                                        id="identityNumber"
                                        name="identityNumber"
                                        value={identityNumber}
                                        className={clsx(styles.formInput, styles.row)}
                                        type="text"
                                        pattern="[0-9]*"
                                        onChange={(e) => {
                                            setIdentityNumber((v) =>
                                                e.target.validity.valid || e.target.value === '' ? e.target.value : v,
                                            );
                                        }}
                                        placeholder="Số CMND/CCCD..."
                                    />
                                </div>
                            </div>

                            <div className={clsx(styles.formRow, styles.row)}>
                                <div className={clsx(styles.formField, styles.col3)}>
                                    <label htmlFor="phone" className={clsx(styles.formLabel, styles.row)}>
                                        Số điện thoại:
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={phone}
                                        pattern="[0-9]*"
                                        onChange={(e) => {
                                            setPhone((v) =>
                                                e.target.validity.valid || e.target.value === '' ? e.target.value : v,
                                            );
                                        }}
                                        className={clsx(styles.formInput, styles.row)}
                                        placeholder="Số điện thoại..."
                                        required
                                    />
                                </div>

                                <div className={clsx(styles.formField, styles.col3)}>
                                    <label htmlFor="gender" className={clsx(styles.formLabel, styles.row)}>
                                        Giới tính:
                                    </label>
                                    <div className={clsx(styles.formRow, styles.row, styles.formGender)}>
                                        <div>
                                            <input
                                                type="radio"
                                                id="male"
                                                className={clsx(styles.hide)}
                                                onChange={() => setGender('male')}
                                                checked={gender === 'male'}
                                            />

                                            <label
                                                className={clsx(styles.genderSelection, styles.formLabel, {
                                                    [styles.checked]: gender === 'male',
                                                })}
                                                htmlFor="male"
                                            >
                                                <Checkbox
                                                    className={clsx(styles.genderSelection, styles.formLabel, {
                                                        [styles.checked]: gender === 'male',
                                                    })}
                                                    checked={gender === 'male'}
                                                    onChange={() => setGender('male')}
                                                />
                                                Nam
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="radio"
                                                id="female"
                                                className={clsx(styles.hide)}
                                                onChange={() => setGender('female')}
                                                checked={gender === 'female'}
                                            />
                                            <label
                                                className={clsx(styles.genderSelection, styles.formLabel, {
                                                    [styles.checked]: gender === 'female',
                                                })}
                                                htmlFor="female"
                                            >
                                                <Checkbox
                                                    className={clsx(styles.genderSelection, styles.formLabel, {
                                                        [styles.checked]: gender === 'female',
                                                    })}
                                                    checked={gender === 'female'}
                                                    onChange={() => setGender('female')}
                                                />
                                                Nữ
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="radio"
                                                id="others"
                                                className={clsx(styles.hide)}
                                                onChange={() => setGender('others')}
                                                checked={gender === 'others'}
                                            />
                                            <label
                                                className={clsx(styles.genderSelection, styles.formLabel, {
                                                    [styles.checked]: gender === 'others',
                                                })}
                                                htmlFor="others"
                                            >
                                                <Checkbox
                                                    className={clsx(styles.genderSelection, styles.formLabel, {
                                                        [styles.checked]: gender === 'others',
                                                    })}
                                                    checked={gender === 'others'}
                                                    onChange={() => setGender('others')}
                                                />
                                                Khác
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className={clsx(styles.formField, styles.col3)}>
                                    <label htmlFor="birthday" className={clsx(styles.formLabel, styles.row)}>
                                        Ngày sinh:
                                    </label>
                                    <input
                                        id="birthday"
                                        name="birthday"
                                        min="1900-01-01"
                                        max="2005-01-01"
                                        type="date"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        className={clsx(styles.formInput, styles.row)}
                                        required
                                    />
                                </div>
                            </div>

                            {role === 'student' && (
                                <div className={clsx(styles.formRow, styles.row)}>
                                    <div className={clsx(styles.formField, styles.col3)}>
                                        <label htmlFor="major" className={clsx(styles.formLabel, styles.row)}>
                                            Chuyên ngành:
                                        </label>
                                        <input
                                            id="major"
                                            name="major"
                                            type="text"
                                            value={major}
                                            className={clsx(styles.formInput, styles.row)}
                                            disabled
                                        />
                                    </div>
                                    <div className={clsx(styles.formField, styles.col3)}>
                                        <label htmlFor="class" className={clsx(styles.formLabel, styles.row)}>
                                            Lớp
                                        </label>
                                        <input
                                            id="class"
                                            name="class"
                                            type="text"
                                            value={classs}
                                            className={clsx(styles.formInput, styles.row)}
                                            disabled
                                        />
                                    </div>
                                    <div className={clsx(styles.formField, styles.col3)}>
                                        <label htmlFor="schoolYear" className={clsx(styles.formLabel, styles.row)}>
                                            Năm bắt đầu:
                                        </label>
                                        <input
                                            id="schoolYear"
                                            name="schoolYear"
                                            type="text"
                                            value={schoolYear}
                                            className={clsx(styles.formInput, styles.row)}
                                            disabled
                                        />
                                    </div>
                                </div>
                            )}

                            <div className={clsx(styles.formRow, styles.row)}>
                                <div className={clsx(styles.formField, styles.col3)}>
                                    <label htmlFor="born" className={clsx(styles.formLabel, styles.row)}>
                                        Quê quán:
                                    </label>
                                    <input
                                        id="born"
                                        name="born"
                                        type="text"
                                        value={born}
                                        onChange={(e) => setBorn(e.target.value)}
                                        placeholder="Quê quán..."
                                        className={clsx(styles.formInput, styles.row)}
                                        required
                                    />
                                </div>

                                <div className={clsx(styles.formField, styles.col3)}>
                                    <label htmlFor="password" className={clsx(styles.formLabel, styles.row)}>
                                        Mật khẩu:
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={clsx(styles.formInput, styles.row)}
                                        placeholder="Mật khẩu..."
                                    />
                                </div>

                                <div className={clsx(styles.formField, styles.col3)}>
                                    <label htmlFor="confirmPassword" className={clsx(styles.formLabel, styles.row)}>
                                        Nhập lại mật khẩu:
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={clsx(styles.formInput, styles.row)}
                                        placeholder="Nhập lại mật khẩu..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={clsx(styles.avatarInput, styles.col)}>
                            <ImageUploader avatarImg={avatarImg} onAvatarChange={setAvatarImg} />
                        </div>
                    </div>
                    <div className={clsx(styles.formRow, styles.formFooter)}>
                        <button value="Submit" type="submit" className={clsx(styles.btn, styles.primary)}>
                            CẬP NHẬT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default memo(UserInformation);
