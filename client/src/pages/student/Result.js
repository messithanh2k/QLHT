import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/system';

const columns = [
    { field: 'term', headerName: 'Học kỳ', width: 120 },
    {
        field: 'id',
        headerName: 'Mã Học Phần',
        width: 150,
    },
    {
        field: 'SubName',
        headerName: 'Tên Học Phần',
        width: 310,
    },
    {
        field: 'credit',
        headerName: 'TC',
        type: 'number',
        width: 110,
    },
    {
        field: 'Mark',
        headerName: 'Điểm học phần',
        width: 150,
    },
];

const rows = [
    { term: '20211', id: 'IT4931', SubName: 'Lưu trữ và xử lý dữ liệu lớn', credit: 3, Mark: 'A+' },
    { term: '20211', id: 'IT4930', SubName: 'Nhập môn Khoa học dữ liệu', credit: 2, Mark: 'B+' },
    { term: '20211', id: 'IT4906', SubName: 'Tính toán tiến hóa	', credit: 2, Mark: 'A' },
    { term: '20211', id: 'IT4653', SubName: 'Học sâu và ứng dụng', credit: 2, Mark: 'B' },
    { term: '20211', id: 'IT4409', SubName: 'Công nghệ Web và dịch vụ trực tuyến', credit: 3, Mark: 'B' },
    { term: '20211', id: 'IT3940', SubName: 'Project III', credit: 3, Mark: 'A+' },
    { term: '20202', id: 'SSH1151', SubName: 'Tư tưởng Hồ Chí Minh', credit: 2, Mark: 'A' },
    { term: '20202', id: 'IT4991', SubName: 'Thực tập kỹ thuật', credit: 2, Mark: 'A+' },
    { term: '20202', id: 'IT4015', SubName: 'Nhập môn an toàn thông tin', credit: 3, Mark: 'A' },
    { term: '20202', id: 'IT3930', SubName: 'Project II', credit: 2, Mark: 'A+' },
    { term: '20202', id: 'IT3190', SubName: 'Nhập môn Học máy và khai phá dữ liệu', credit: 3, Mark: 'A' },
    { term: '20202', id: 'IT3170', SubName: 'Thuật toán ứng dụng', credit: 2, Mark: 'B+' },
    { term: '20202', id: 'IT3120', SubName: 'Phân tích thiết kế hệ thống', credit: 2, Mark: 'B+' },
    { term: '20202', id: 'IT2030', SubName: 'Technical Writing and Presentation', credit: 3, Mark: 'A' },
    { term: '20202', id: 'ED3220', SubName: 'Kỹ năng mềm', credit: 2, Mark: 'A' },
];

function Result() {
    return (
        <Container maxWidth='md' sx={{mt: 5, mb: 5}}>
            <Box sx={{ height: 'auto', width: '100%' }}>
                <DataGrid
                    sx={{p: 2}}
                    rows={rows}
                    columns={columns}
                    disableSelectionOnClick
                    rowsPerPageOptions={['ALL']}
                    autoHeight
                />
            </Box>
        </Container>
    );
}

export default Result;
