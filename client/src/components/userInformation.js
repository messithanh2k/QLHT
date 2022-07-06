import React, { useEffect, useState, memo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { format } from 'date-fns';
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
    console.log(user);
    console.log(user.phone);
    const [avatarImg, setAvatarImg] = useState(user.avatarImg);
    const sid = user.SID;
    const fullName = user.fullName;
    const email = user.email;
    const gender = user.gender;
    const birthday = user.birthday;
    const schoolYear = user.schoolYear;
    const classs = user.classs;
    const major = user.major;
    const born = user.born;
    const identityNumber = user.identityNumber;
    const [phone, setPhone] = useState(user.phone);
    console.log(phone);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState({
        type: 'success',
        message: '',
    });

    const [open, setOpen] = useState(false);

    const [success, setSuccess] = useState(false);

    console.log(avatarImg);
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
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                setErrMsg({ type: 'error', message: 'Mật khẩu không khớp!' });
            }
            if (password.length < 6) {
                setErrMsg({ type: 'error', message: 'Mật khẩu phải chứa ít nhất 6 kí tự!' });
            }
        }

        if (errMsg.message === '') {
            props
                .onUpdate(email, phone, password, avatarImg)
                .then(() => {
                    setErrMsg({ type: 'success', message: 'Cập nhật thành công' });
                    setSuccess(true);
                })
                .catch((err) => {
                    setErrMsg({ type: 'error', message: err });
                    //console.log(err);
                    setOpen(true);
                });
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
            setErrMsg({ type: '', message: '' });
        }
    }, [success]);

    useEffect(() => {
        setAvatarImg(user.avatarImg);
        setPhone(user.phone);
    }, [user]);

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
                                        type="text"
                                        className={clsx(styles.formInput, styles.row)}
                                        disabled
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
                                        disabled
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
                                        defaultValue={user.phone}
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
                                                id="Male"
                                                className={clsx(styles.hide)}
                                                checked={gender === 'Male'}
                                            />

                                            <label
                                                className={clsx(styles.genderSelection, styles.formLabel, {
                                                    [styles.checked]: gender === 'Male',
                                                })}
                                                htmlFor="Male"
                                            >
                                                <Checkbox
                                                    className={clsx(styles.genderSelection, styles.formLabel, {
                                                        [styles.checked]: gender === 'Male',
                                                    })}
                                                    checked={gender === 'Male'}
                                                />
                                                Nam
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="radio"
                                                id="Female"
                                                className={clsx(styles.hide)}
                                                checked={gender === 'Female'}
                                            />
                                            <label
                                                className={clsx(styles.genderSelection, styles.formLabel, {
                                                    [styles.checked]: gender === 'Female',
                                                })}
                                                htmlFor="Female"
                                            >
                                                <Checkbox
                                                    className={clsx(styles.genderSelection, styles.formLabel, {
                                                        [styles.checked]: gender === 'Female',
                                                    })}
                                                    checked={gender === 'Female'}
                                                />
                                                Nữ
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="radio"
                                                id="Other"
                                                className={clsx(styles.hide)}
                                                checked={gender === 'Other'}
                                            />
                                            <label
                                                className={clsx(styles.genderSelection, styles.formLabel, {
                                                    [styles.checked]: gender === 'Other',
                                                })}
                                                htmlFor="Other"
                                            >
                                                <Checkbox
                                                    className={clsx(styles.genderSelection, styles.formLabel, {
                                                        [styles.checked]: gender === 'Other',
                                                    })}
                                                    checked={gender === 'Other'}
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
                                        type="text"
                                        value={
                                            birthday &&
                                            `${birthday.slice(8, 10)}/${birthday.slice(5, 7)}/${birthday.slice(0, 4)}`
                                        }
                                        className={clsx(styles.formInput, styles.row)}
                                        disabled
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
                                        className={clsx(styles.formInput, styles.row)}
                                        disabled
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
                        <button onClick={handleSubmit} className={clsx(styles.btn, styles.primary)}>
                            CẬP NHẬT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserInformation;
