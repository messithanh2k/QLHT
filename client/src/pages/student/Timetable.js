import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';

import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';

const appointments = [
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 2 , 28, 6, 45),
        endDate: new Date(2022, 2, 28, 10, 5),
        id: 0,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 2 , 28, 10, 15),
        endDate: new Date(2022, 2, 28, 11, 45),
        id: 1,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 2, 30, 6, 45),
        endDate: new Date(2022, 2, 30, 10, 5),
        id: 2,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 2, 30, 10, 15),
        endDate: new Date(2022, 2, 30, 11, 45),
        id: 3,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 2, 30, 12, 30),
        endDate: new Date(2022, 2, 30, 15, 50),
        id: 4,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 2, 31, 15, 5),
        endDate: new Date(2022, 2, 31, 17, 30),
        id: 5,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 3, 1, 6, 45),
        endDate: new Date(2022, 3, 1, 9, 10),
        id: 6,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 3, 1, 9, 20),
        endDate: new Date(2022, 3, 1, 11, 45),
        id: 7,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 3 , 4, 6, 45),
        endDate: new Date(2022, 3, 4, 10, 5),
        id: 8,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 3 , 4, 10, 15),
        endDate: new Date(2022, 3, 4, 11, 45),
        id: 9,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 3, 6, 6, 45),
        endDate: new Date(2022, 3, 6, 10, 5),
        id: 10,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 3, 6, 10, 15),
        endDate: new Date(2022, 3, 6, 11, 45),
        id: 11,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 3, 6, 12, 30),
        endDate: new Date(2022, 3, 6, 15, 50),
        id: 12,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 3, 7, 15, 5),
        endDate: new Date(2022, 3, 7, 17, 30),
        id: 13,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 3, 8, 6, 45),
        endDate: new Date(2022, 3, 8, 9, 10),
        id: 14,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 3, 8, 9, 20),
        endDate: new Date(2022, 3, 8, 11, 45),
        id: 15,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 3 , 11, 6, 45),
        endDate: new Date(2022, 3, 11, 10, 5),
        id: 16,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 3 , 11, 10, 15),
        endDate: new Date(2022, 3, 11, 11, 45),
        id: 17,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 3, 13, 6, 45),
        endDate: new Date(2022, 3, 13, 10, 5),
        id: 18,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 3, 13, 10, 15),
        endDate: new Date(2022, 3, 13, 11, 45),
        id: 19,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 3, 13, 12, 30),
        endDate: new Date(2022, 3, 13, 15, 50),
        id: 20,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 3, 14, 15, 5),
        endDate: new Date(2022, 3, 14, 17, 30),
        id: 21,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 3, 15, 6, 45),
        endDate: new Date(2022, 3, 15, 9, 10),
        id: 22,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 3, 15, 9, 20),
        endDate: new Date(2022, 3, 15, 11, 45),
        id: 23,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 3 , 18, 6, 45),
        endDate: new Date(2022, 3, 18, 10, 5),
        id: 24,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 3 , 18, 10, 15),
        endDate: new Date(2022, 3, 18, 11, 45),
        id: 25,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 3, 20, 6, 45),
        endDate: new Date(2022, 3, 20, 10, 5),
        id: 26,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 3, 20, 10, 15),
        endDate: new Date(2022, 3, 20, 11, 45),
        id: 27,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 3, 20, 12, 30),
        endDate: new Date(2022, 3, 20, 15, 50),
        id: 28,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 3, 21, 15, 5),
        endDate: new Date(2022, 3, 21, 17, 30),
        id: 29,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 3, 22, 6, 45),
        endDate: new Date(2022, 3, 22, 9, 10),
        id: 30,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 3, 22, 9, 20),
        endDate: new Date(2022, 3, 22, 11, 45),
        id: 31,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 3 , 25, 6, 45),
        endDate: new Date(2022, 3, 25, 10, 5),
        id: 32,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 3 , 25, 10, 15),
        endDate: new Date(2022, 3, 25, 11, 45),
        id: 33,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 3, 27, 6, 45),
        endDate: new Date(2022, 3, 27, 10, 5),
        id: 34,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 3, 27, 10, 15),
        endDate: new Date(2022, 3, 27, 11, 45),
        id: 35,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 3, 27, 12, 30),
        endDate: new Date(2022, 3, 27, 15, 50),
        id: 36,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 3, 28, 15, 5),
        endDate: new Date(2022, 3, 28, 17, 30),
        id: 37,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 3, 29, 6, 45),
        endDate: new Date(2022, 3, 29, 9, 10),
        id: 38,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 3, 29, 9, 20),
        endDate: new Date(2022, 3, 29, 11, 45),
        id: 39,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 4 , 2, 6, 45),
        endDate: new Date(2022, 4, 2, 10, 5),
        id: 40,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 4 , 2, 10, 15),
        endDate: new Date(2022, 4, 2, 11, 45),
        id: 41,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 4, 4, 6, 45),
        endDate: new Date(2022, 4, 4, 10, 5),
        id: 42,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 4, 4, 10, 15),
        endDate: new Date(2022, 4, 4, 11, 45),
        id: 43,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 4, 4, 12, 30),
        endDate: new Date(2022, 4, 4, 15, 50),
        id: 44,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 4, 5, 15, 5),
        endDate: new Date(2022, 4, 5, 17, 30),
        id: 45,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 4, 6, 6, 45),
        endDate: new Date(2022, 4, 6, 9, 10),
        id: 46,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 4, 6, 9, 20),
        endDate: new Date(2022, 4, 6, 11, 45),
        id: 47,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 4 , 9, 6, 45),
        endDate: new Date(2022, 4, 9, 10, 5),
        id: 48,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 4 , 9, 10, 15),
        endDate: new Date(2022, 4, 9, 11, 45),
        id: 49,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 4, 11, 6, 45),
        endDate: new Date(2022, 4, 11, 10, 5),
        id: 50,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 4, 11, 10, 15),
        endDate: new Date(2022, 4, 11, 11, 45),
        id: 51,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 4, 11, 12, 30),
        endDate: new Date(2022, 4, 11, 15, 50),
        id: 52,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 4, 12, 15, 5),
        endDate: new Date(2022, 4, 12, 17, 30),
        id: 53,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 4, 13, 6, 45),
        endDate: new Date(2022, 4, 13, 9, 10),
        id: 54,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 4, 13, 9, 20),
        endDate: new Date(2022, 4, 13, 11, 45),
        id: 55,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 4 , 16, 6, 45),
        endDate: new Date(2022, 4, 16, 10, 5),
        id: 56,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 4 , 16, 10, 15),
        endDate: new Date(2022, 4, 16, 11, 45),
        id: 57,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 4, 18, 6, 45),
        endDate: new Date(2022, 4, 18, 10, 5),
        id: 58,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 4, 18, 10, 15),
        endDate: new Date(2022, 4, 18, 11, 45),
        id: 59,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 4, 18, 12, 30),
        endDate: new Date(2022, 4, 18, 15, 50),
        id: 60,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 4, 19, 15, 5),
        endDate: new Date(2022, 4, 19, 17, 30),
        id: 61,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 4, 20, 6, 45),
        endDate: new Date(2022, 4, 20, 9, 10),
        id: 62,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 4, 20, 9, 20),
        endDate: new Date(2022, 4, 20, 11, 45),
        id: 63,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 6 , 18, 6, 45),
        endDate: new Date(2022, 6, 18, 10, 5),
        id: 64,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 6 , 18, 10, 15),
        endDate: new Date(2022, 6, 18, 11, 45),
        id: 65,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 6, 20, 6, 45),
        endDate: new Date(2022, 6, 20, 10, 5),
        id: 66,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 6, 20, 10, 15),
        endDate: new Date(2022, 6, 20, 11, 45),
        id: 67,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 6, 20, 12, 30),
        endDate: new Date(2022, 6, 20, 15, 50),
        id: 68,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 6, 21, 15, 5),
        endDate: new Date(2022, 6, 21, 17, 30),
        id: 69,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 6, 22, 6, 45),
        endDate: new Date(2022, 6, 22, 9, 10),
        id: 70,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 6, 22, 9, 20),
        endDate: new Date(2022, 6, 22, 11, 45),
        id: 71,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 4 , 30, 6, 45),
        endDate: new Date(2022, 4, 30, 10, 5),
        id: 72,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 4 , 30, 10, 15),
        endDate: new Date(2022, 4, 30, 11, 45),
        id: 73,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 5, 1, 6, 45),
        endDate: new Date(2022, 5, 1, 10, 5),
        id: 74,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 5, 1, 10, 15),
        endDate: new Date(2022, 5, 1, 11, 45),
        id: 75,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 5, 1, 12, 30),
        endDate: new Date(2022, 5, 1, 15, 50),
        id: 76,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 5, 2, 15, 5),
        endDate: new Date(2022, 5, 2, 17, 30),
        id: 77,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 5, 3, 6, 45),
        endDate: new Date(2022, 5, 3, 9, 10),
        id: 78,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 5, 3, 9, 20),
        endDate: new Date(2022, 5, 3, 11, 45),
        id: 79,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 5 , 6, 6, 45),
        endDate: new Date(2022, 5, 6, 10, 5),
        id: 80,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 5 , 6, 10, 15),
        endDate: new Date(2022, 5, 6, 11, 45),
        id: 81,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 5, 8, 6, 45),
        endDate: new Date(2022, 5, 8, 10, 5),
        id: 82,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 5, 8, 10, 15),
        endDate: new Date(2022, 5, 8, 11, 45),
        id: 83,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 5, 8, 12, 30),
        endDate: new Date(2022, 5, 8, 15, 50),
        id: 84,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 5, 9, 15, 5),
        endDate: new Date(2022, 5, 9, 17, 30),
        id: 85,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 5, 10, 6, 45),
        endDate: new Date(2022, 5, 10, 9, 10),
        id: 86,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 5, 10, 9, 20),
        endDate: new Date(2022, 5, 10, 11, 45),
        id: 87,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 5 , 13, 6, 45),
        endDate: new Date(2022, 5, 13, 10, 5),
        id: 88,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 5 , 13, 10, 15),
        endDate: new Date(2022, 5, 13, 11, 45),
        id: 89,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 5, 15, 6, 45),
        endDate: new Date(2022, 5, 15, 10, 5),
        id: 90,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 5, 15, 10, 15),
        endDate: new Date(2022, 5, 15, 11, 45),
        id: 91,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 5, 15, 12, 30),
        endDate: new Date(2022, 5, 15, 15, 50),
        id: 92,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 5, 16, 15, 5),
        endDate: new Date(2022, 5, 16, 17, 30),
        id: 93,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 5, 17, 6, 45),
        endDate: new Date(2022, 5, 17, 9, 10),
        id: 94,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 5, 17, 9, 20),
        endDate: new Date(2022, 5, 17, 11, 45),
        id: 95,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 5 , 20, 6, 45),
        endDate: new Date(2022, 5, 20, 10, 5),
        id: 96,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 5 , 20, 10, 15),
        endDate: new Date(2022, 5, 20, 11, 45),
        id: 97,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 5, 22, 6, 45),
        endDate: new Date(2022, 5, 22, 10, 5),
        id: 98,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 5, 22, 10, 15),
        endDate: new Date(2022, 5, 22, 11, 45),
        id: 99,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 5, 22, 12, 30),
        endDate: new Date(2022, 5, 22, 15, 50),
        id: 100,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 5, 23, 15, 5),
        endDate: new Date(2022, 5, 23, 17, 30),
        id: 101,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 5, 24, 6, 45),
        endDate: new Date(2022, 5, 24, 9, 10),
        id: 102,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 5, 24, 9, 20),
        endDate: new Date(2022, 5, 24, 11, 45),
        id: 103,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 5 , 27, 6, 45),
        endDate: new Date(2022, 5, 27, 10, 5),
        id: 104,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 5 , 27, 10, 15),
        endDate: new Date(2022, 5, 27, 11, 45),
        id: 105,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 5, 29, 6, 45),
        endDate: new Date(2022, 5, 29, 10, 5),
        id: 106,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 5, 29, 10, 15),
        endDate: new Date(2022, 5, 29, 11, 45),
        id: 107,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 5, 29, 12, 30),
        endDate: new Date(2022, 5, 29, 15, 50),
        id: 108,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 5, 30, 15, 5),
        endDate: new Date(2022, 5, 30, 17, 30),
        id: 109,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 6, 1, 6, 45),
        endDate: new Date(2022, 6, 1, 9, 10),
        id: 110,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 6, 1, 9, 20),
        endDate: new Date(2022, 6, 1, 11, 45),
        id: 111,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 6 , 4, 6, 45),
        endDate: new Date(2022, 6, 4, 10, 5),
        id: 112,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 6 , 4, 10, 15),
        endDate: new Date(2022, 6, 4, 11, 45),
        id: 113,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 6, 6, 6, 45),
        endDate: new Date(2022, 6, 6, 10, 5),
        id: 114,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 6, 6, 10, 15),
        endDate: new Date(2022, 6, 6, 11, 45),
        id: 115,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 6, 6, 12, 30),
        endDate: new Date(2022, 6, 6, 15, 50),
        id: 116,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 6, 7, 15, 5),
        endDate: new Date(2022, 6, 7, 17, 30),
        id: 117,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 6, 8, 6, 45),
        endDate: new Date(2022, 6, 8, 9, 10),
        id: 118,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 6, 8, 9, 20),
        endDate: new Date(2022, 6, 8, 11, 45),
        id: 119,
        location: 'Phòng TC-312',
    },
    {
        title: 'Thị giác máy tính',
        startDate: new Date(2022, 6 , 11, 6, 45),
        endDate: new Date(2022, 6, 11, 10, 5),
        id: 120,
        location: 'Phòng TC-307',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 6 , 11, 10, 15),
        endDate: new Date(2022, 6, 11, 11, 45),
        id: 121,
        location: 'Phòng TC-307',
    },
    {
        title: 'Khai phá Web',
        startDate: new Date(2022, 6, 13, 6, 45),
        endDate: new Date(2022, 6, 13, 10, 5),
        id: 122,
        location: 'Phòng TC-207',
    },
    {
        title: 'Tích hợp dữ liệu',
        startDate: new Date(2022, 6, 13, 10, 15),
        endDate: new Date(2022, 6, 13, 11, 45),
        id: 123,
        location: 'Phòng TC-207',
    },
    {
        title: 'Xử lý ngôn ngữ tự nhiên',
        startDate: new Date(2022, 6, 13, 12, 30),
        endDate: new Date(2022, 6, 13, 15, 50),
        id: 124,
        location: 'Phòng TC-305',
    },
    {
        title: 'Chuyên đề',
        startDate: new Date(2022, 6, 14, 15, 5),
        endDate: new Date(2022, 6, 14, 17, 30),
        id: 125,
        location: 'Phòng D9-407',
    },
    {
        title: 'Phân tích nghiệp vụ thông minh',
        startDate: new Date(2022, 6, 15, 6, 45),
        endDate: new Date(2022, 6, 15, 9, 10),
        id: 126,
        location: 'Phòng TC-305',
    },
    {
        title: 'Quản trị dự án CNTT',
        startDate: new Date(2022, 6, 15, 9, 20),
        endDate: new Date(2022, 6, 15, 11, 45),
        id: 127,
        location: 'Phòng TC-312',
    },
];

const PREFIX = 'field';

const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  header: `${PREFIX}-header`,
};

const StyledGrid = styled(Grid)(() => ({
    [`&.${classes.textCenter}`]: {
      textAlign: 'center',
    },
  }));

  
const Content = (({
    children, appointmentData, ...restProps
  }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container alignItems="center">
        <StyledGrid item xs={2} className={classes.textCenter}>
            <LocationOnIcon fontSize='medium' color='primary'/>
        </StyledGrid>
        <Grid item xs={10}>
          <span>{appointmentData.location}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  ));


export default class Timetable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: appointments,
            currentDate: new Date(),
        };
        this.currentDateChange = (currentDate) => {
            this.setState({ currentDate });
        };
    }
    render() {
        const { data, currentDate } = this.state;
        return (
            <Container maxWidth='lg' sx={{mb: 5}}>
            <Paper>
                <Scheduler data={data} height={1400}>
                    <ViewState currentDate={currentDate} onCurrentDateChange={this.currentDateChange} />
                    <WeekView startDayHour={6} endDayHour={19} />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                    <AppointmentTooltip 
                    contentComponent={Content}
                    showCloseButton />
                </Scheduler>
            </Paper>
            </Container>
        );
    }
}
