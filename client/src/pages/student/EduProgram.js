import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container } from '@mui/system';

function createData(name, count, total_credit, total_credit_done, subjects) {
    return {
        name,
        count,
        total_credit,
        total_credit_done,
        subjects
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(true);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right">{row.total_credit}</TableCell>
                <TableCell align="right">{row.total_credit_done}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Course ID</TableCell>
                                        <TableCell>Course Name</TableCell>
                                        <TableCell align="right">Term</TableCell>
                                        <TableCell align="right">Credit</TableCell>
                                        <TableCell align="right">Complete</TableCell>
                                        <TableCell align="right">Mark</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.subjects.map((subject) => (
                                        <TableRow key={subject.subject_id}>
                                            <TableCell component="th" scope="row">
                                                {subject.subject_id}
                                            </TableCell>
                                            <TableCell>{subject.subject_name}</TableCell>
                                            <TableCell align="right">{subject.term}</TableCell>
                                            <TableCell align="right">{subject.credit}</TableCell>
                                            <TableCell align="right">{subject.credit_done}</TableCell>
                                            <TableCell align="right">{subject.mark}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        total_credit: PropTypes.number.isRequired,
        total_credit_done: PropTypes.number.isRequired,
        subjects: PropTypes.arrayOf(
            PropTypes.shape({
                subject_id: PropTypes.string.isRequired,
                subject_name: PropTypes.string.isRequired,
                term: PropTypes.string.isRequired,
                credit: PropTypes.number.isRequired,
                credit_done: PropTypes.number.isRequired,
                mark: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

const rows = [
    createData('Đồ án/Khóa luận Tốt nghiệp', 1, 6, 0, [
        {
            subject_id: 'IT4995',
            subject_name: 'Đồ án tốt nghiệp cử nhân',
            term: '8',
            credit: 6,
            credit_done: 0,
            mark: ''
        }
    ],),
    createData('Tự chọn II', 2, 0, 0, [
        {
            subject_id: 'PE1015',
            subject_name: 'Thể dục tay không',
            term: '',
            credit: 0,
            credit_done: 0,
            mark: ''
        }
    ,
    
        {
            subject_id: 'PE2261',
            subject_name: 'Karatedo',
            term: '',
            credit: 0,
            credit_done: 0,
            mark: ''
        } 
    ]),
    createData('Tự chọn GDTC C', 20, 0, 0, [
        {
            subject_id: 'PE2101',
            subject_name: 'Bóng chuyền 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        }
    ,
    
        {
            subject_id: 'PE2151',
            subject_name: 'Erobic',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2201',
            subject_name: 'Bóng đá 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2251',
            subject_name: 'Taekwondo 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2301',
            subject_name: 'Bóng rổ 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2401',
            subject_name: 'Bóng bàn 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2501',
            subject_name: 'Cầu lông 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2601',
            subject_name: 'Chạy',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2701',
            subject_name: 'Nhảy cao',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2801',
            subject_name: 'Nhảy xa',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2901',
            subject_name: 'Xà kép, xà lệch',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3101',
            subject_name: 'Chuyên sâu Bóng chuyền 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3102',
            subject_name: 'Chuyên sâu Bóng chuyền 2',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3103',
            subject_name: 'Chuyên sâu Bóng chuyền 3',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3201',
            subject_name: 'Chuyên sâu Bóng đá 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3202',
            subject_name: 'Chuyên sâu Bóng đá 2',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3203',
            subject_name: 'Chuyên sâu Bóng đá 3',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3301',
            subject_name: 'Chuyên sâu Bóng rổ 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3302',
            subject_name: 'Chuyên sâu Bóng rổ 2',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3303',
            subject_name: 'Chuyên sâu Bóng rổ 3',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },

    ]),
    createData('Lý luận chính trị + Pháp luật đại cương', 5, 12, 0, [
        {
            subject_id: 'EM1170',
            subject_name: 'Pháp luật đại cương',
            term: '1',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'SSH1050',
            subject_name: 'Tư tưởng HCM',
            term: '3',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'SSH1110',
            subject_name: 'Những NLCB của CNML I',
            term: '1',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'SSH1120',
            subject_name: 'Những NLCB của CNML II',
            term: '2',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'SSH1130',
            subject_name: 'Đường lối CM của ĐCSVN',
            term: '4',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
    ]),
    createData('Giáo dục thể chất', 2, 0, 0, [
        {
            subject_id: 'PE1014',
            subject_name: 'Lý luận TDTT',
            term: '1',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE1024',
            subject_name: 'Bơi lội',
            term: '1',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
    ]),
    createData('Giáo dục Quốc phòng - An ninh', 3, 0, 0, [
        {
            subject_id: 'MIL1110',
            subject_name: 'Đường lối quân sự',
            term: '1',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MIL1120',
            subject_name: 'Công tác quốc phòng-An ninh',
            term: '2',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MIL1130',
            subject_name: 'QS chung và KCT bắn súng AK',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
    ]),
    createData('Tiếng Anh', 2, 0, 0, [
        {
            subject_id: 'FL1100',
            subject_name: 'Tiếng Anh 1',
            term: '1',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'FL1101',
            subject_name: 'Tiếng Anh 2',
            term: '2',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
    ]),
    createData('Khối kiến thức Toán và Khoa học cơ bản', 10, 32, 0, [
        {
            subject_id: 'IT1110',
            subject_name: 'Tin học đại cương',
            term: '2',
            credit: 4,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3020',
            subject_name: 'Toán rời rạc',
            term: '3',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MI1111',
            subject_name: 'Giải tích I',
            term: '1',
            credit: 4,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MI1121',
            subject_name: 'Giải tích II',
            term: '2',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MI1131',
            subject_name: 'Giải tích III',
            term: '3',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MI1141',
            subject_name: 'Đại số',
            term: '1',
            credit: 4,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MI2020',
            subject_name: 'Xác suất thống kê',
            term: '3',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MI3052',
            subject_name: 'Nhập môn các phương pháp tối ưu',
            term: '3',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PH1110',
            subject_name: 'Vật lý đại cương I',
            term: '2',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PH1120',
            subject_name: 'Vật lý đại cương II',
            term: '3',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
    ]),
    createData('Cơ sở và cốt lõi ngành', 20, 51, 0, [
        {
            subject_id: 'IT2000',
            subject_name: 'Nhập môn CNTT và TT	',
            term: '1',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT2030',
            subject_name: 'Technical Writing and Presentation',
            term: '',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3011',
            subject_name: 'Cấu trúc dữ liệu và thuật toán',
            term: '4',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3030',
            subject_name: 'Kiến trúc máy tính',
            term: '4',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3040',
            subject_name: 'Kỹ thuật lập trình',
            term: '4',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3070',
            subject_name: 'Nguyên lý hệ điều hành',
            term: '4',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3080',
            subject_name: 'Mạng máy tính',
            term: '5',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3090',
            subject_name: 'Cơ sở dữ liệu',
            term: '5',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3100',
            subject_name: 'Lập trình hướng đối tượng',
            term: '5',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3120',
            subject_name: 'Phân tích và thiết kế hệ thống',
            term: '6',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3150',
            subject_name: '	Project I',
            term: '5',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3160',
            subject_name: 'Nhập môn Trí tuệ nhân tạo',
            term: '5',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3170',
            subject_name: 'Thuật toán ứng dụng',
            term: '6',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3180',
            subject_name: 'Nhập môn công nghệ phần mềm',
            term: '5',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3190',
            subject_name: 'Nhập môn Học máy và khai phá dữ liệu',
            term: '6',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3930',
            subject_name: 'Project II',
            term: '6',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3940',
            subject_name: 'Project III',
            term: '7',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT4015',
            subject_name: 'Nhập môn an toàn thông tin',
            term: '6',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT4244',
            subject_name: 'Quản trị dự án CNTT',
            term: '8',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT4480',
            subject_name: 'Làm việc nhóm và kỹ năng giao tiếp',
            term: '4',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
    ]),
];

export default function EduProgram() {
    return (
        <Container maxWidth="lg">
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align='left'>Course Type</TableCell>
                            <TableCell align="right">Count</TableCell>
                            <TableCell align="right">Total Credit</TableCell>
                            <TableCell align="right">Total Complete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}