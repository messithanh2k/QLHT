import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './CSS/LecturerClassesCSS.module.scss';
import MUIDataTable from 'mui-datatables';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import GmailService from '../service/GmailService';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/header';
import Footer from '../components/footer';

function LecturerClasses(props) {
    // console.log('re-render');
    const [data, setData] = useState([]);
    // const [customerList, setCustomerList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        axios
            .post('http://localhost:3001/lecturer/getClasses', { email: GmailService.getLocalGmail() })
            .then((res) => {
                // console.log(res.data.data)
                setData(res.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    //data table
    const columns = [
        {
            name: 'SubID',
            label: 'Mã môn học',
        },

        {
            name: 'ClassID',
            label: 'Mã lớp học',
        },
        {
            name: 'Day',
            label: 'Ngày',
        },
        {
            name: 'StartTime',
            label: 'Thời gian bắt đầu',
        },
        {
            name: 'EndTime',
            label: 'Thời gian kết thúc',
        },
        {
            name: 'Room',
            label: 'Phòng học',
        },
    ];

    const options = {
        print: false,
        selectableRows: 'none',
        responsive: 'standard',
        // selectableRows: true,
        viewColumns: false,
        tableBodyHeight: '100%',
        filter: true,
        filterType: 'dropdown',
        onRowClick: (rowData, rowState) => {
            setSelectedItem(data[rowState.dataIndex]);
            // console.log(rowData, rowState);
        },
        // onRowClick: (selectedRows) => {
        //   console.log(data[selectedRows.data[0].dataIndex]);
        //   setSelectedItem(data[selectedRows.data[0].dataIndex]);
        //
        //   // return (
        //   //   <>
        //   //     <Tooltip
        //   //       title={
        //   //         selectedRows.status === 'Active'
        //   //           ? 'Khóa tài khoản'
        //   //           : 'Mở khóa tài khoản'
        //   //       }
        //   //     >
        //   //       <IconButton
        //   //         onClick={() => {
        //   //           block(
        //   //             data[selectedRows.data[0].dataIndex]['email'],
        //   //             data[selectedRows.data[0].dataIndex]['role']
        //   //           );
        //   //         }}
        //   //       >
        //   //         <BlockIcon />
        //   //         <span styles="font-size: 12px">
        //   //           {selectedRows.status === 'Active'
        //   //             ? 'Khóa tài khoản'
        //   //             : 'Mở khóa tài khoản'}
        //   //         </span>
        //   //       </IconButton>
        //   //     </Tooltip>
        //   //   </>
        //   // );
        // },
    };

    const accessToken = TokenService.getLocalAccessToken();
    if (!accessToken) {
        return <Navigate to="/lecturer/login"></Navigate>;
    }
    if (accessToken) {
        if (RoleService.getLocalRole() === 'student') {
            return <Navigate to="/"></Navigate>;
        }
        if (RoleService.getLocalRole() === 'admin') {
            return <Navigate to="/shopper/accept-order"></Navigate>;
        }
        if (RoleService.getLocalRole() === 'lecturer') {
            return (
                <div>
                    <Header />

                    <div className={clsx(styles.pageContent)}>
                        <div className={clsx(styles.pageBody)}>
                            <MUIDataTable
                                className={clsx(styles.dataTable)}
                                title={'Thông tin lớp học của giảng viên'}
                                data={data}
                                columns={columns}
                                options={options}
                            />
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}
export default LecturerClasses;
