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
    createData('????? ??n/Kh??a lu???n T???t nghi???p', 1, 6, 0, [
        {
            subject_id: 'IT4995',
            subject_name: '????? ??n t???t nghi???p c??? nh??n',
            term: '8',
            credit: 6,
            credit_done: 0,
            mark: ''
        }
    ],),
    createData('T??? ch???n II', 2, 0, 0, [
        {
            subject_id: 'PE1015',
            subject_name: 'Th??? d???c tay kh??ng',
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
    createData('T??? ch???n GDTC C', 20, 0, 0, [
        {
            subject_id: 'PE2101',
            subject_name: 'B??ng chuy???n 1',
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
            subject_name: 'B??ng ???? 1',
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
            subject_name: 'B??ng r??? 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2401',
            subject_name: 'B??ng b??n 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2501',
            subject_name: 'C???u l??ng 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2601',
            subject_name: 'Ch???y',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2701',
            subject_name: 'Nh???y cao',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2801',
            subject_name: 'Nh???y xa',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE2901',
            subject_name: 'X?? k??p, x?? l???ch',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3101',
            subject_name: 'Chuy??n s??u B??ng chuy???n 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3102',
            subject_name: 'Chuy??n s??u B??ng chuy???n 2',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3103',
            subject_name: 'Chuy??n s??u B??ng chuy???n 3',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3201',
            subject_name: 'Chuy??n s??u B??ng ???? 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3202',
            subject_name: 'Chuy??n s??u B??ng ???? 2',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3203',
            subject_name: 'Chuy??n s??u B??ng ???? 3',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3301',
            subject_name: 'Chuy??n s??u B??ng r??? 1',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3302',
            subject_name: 'Chuy??n s??u B??ng r??? 2',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE3303',
            subject_name: 'Chuy??n s??u B??ng r??? 3',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },

    ]),
    createData('L?? lu???n ch??nh tr??? + Ph??p lu???t ?????i c????ng', 5, 12, 0, [
        {
            subject_id: 'EM1170',
            subject_name: 'Ph??p lu???t ?????i c????ng',
            term: '1',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'SSH1050',
            subject_name: 'T?? t?????ng HCM',
            term: '3',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'SSH1110',
            subject_name: 'Nh???ng NLCB c???a CNML I',
            term: '1',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'SSH1120',
            subject_name: 'Nh???ng NLCB c???a CNML II',
            term: '2',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'SSH1130',
            subject_name: '???????ng l???i CM c???a ??CSVN',
            term: '4',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
    ]),
    createData('Gi??o d???c th??? ch???t', 2, 0, 0, [
        {
            subject_id: 'PE1014',
            subject_name: 'L?? lu???n TDTT',
            term: '1',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PE1024',
            subject_name: 'B??i l???i',
            term: '1',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
    ]),
    createData('Gi??o d???c Qu???c ph??ng - An ninh', 3, 0, 0, [
        {
            subject_id: 'MIL1110',
            subject_name: '???????ng l???i qu??n s???',
            term: '1',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MIL1120',
            subject_name: 'C??ng t??c qu???c ph??ng-An ninh',
            term: '2',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MIL1130',
            subject_name: 'QS chung v?? KCT b???n s??ng AK',
            term: '3',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
    ]),
    createData('Ti???ng Anh', 2, 0, 0, [
        {
            subject_id: 'FL1100',
            subject_name: 'Ti???ng Anh 1',
            term: '1',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'FL1101',
            subject_name: 'Ti???ng Anh 2',
            term: '2',
            credit: 0,
            credit_done: 0,
            mark: ''
        },
    ]),
    createData('Kh???i ki???n th???c To??n v?? Khoa h???c c?? b???n', 10, 32, 0, [
        {
            subject_id: 'IT1110',
            subject_name: 'Tin h???c ?????i c????ng',
            term: '2',
            credit: 4,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3020',
            subject_name: 'To??n r???i r???c',
            term: '3',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MI1111',
            subject_name: 'Gi???i t??ch I',
            term: '1',
            credit: 4,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MI1121',
            subject_name: 'Gi???i t??ch II',
            term: '2',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MI1131',
            subject_name: 'Gi???i t??ch III',
            term: '3',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MI1141',
            subject_name: '?????i s???',
            term: '1',
            credit: 4,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MI2020',
            subject_name: 'X??c su???t th???ng k??',
            term: '3',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'MI3052',
            subject_name: 'Nh???p m??n c??c ph????ng ph??p t???i ??u',
            term: '3',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PH1110',
            subject_name: 'V???t l?? ?????i c????ng I',
            term: '2',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'PH1120',
            subject_name: 'V???t l?? ?????i c????ng II',
            term: '3',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
    ]),
    createData('C?? s??? v?? c???t l??i ng??nh', 20, 51, 0, [
        {
            subject_id: 'IT2000',
            subject_name: 'Nh???p m??n CNTT v?? TT	',
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
            subject_name: 'C???u tr??c d??? li???u v?? thu???t to??n',
            term: '4',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3030',
            subject_name: 'Ki???n tr??c m??y t??nh',
            term: '4',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3040',
            subject_name: 'K??? thu???t l???p tr??nh',
            term: '4',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3070',
            subject_name: 'Nguy??n l?? h??? ??i???u h??nh',
            term: '4',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3080',
            subject_name: 'M???ng m??y t??nh',
            term: '5',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3090',
            subject_name: 'C?? s??? d??? li???u',
            term: '5',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3100',
            subject_name: 'L???p tr??nh h?????ng ?????i t?????ng',
            term: '5',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3120',
            subject_name: 'Ph??n t??ch v?? thi???t k??? h??? th???ng',
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
            subject_name: 'Nh???p m??n Tr?? tu??? nh??n t???o',
            term: '5',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3170',
            subject_name: 'Thu???t to??n ???ng d???ng',
            term: '6',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3180',
            subject_name: 'Nh???p m??n c??ng ngh??? ph???n m???m',
            term: '5',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT3190',
            subject_name: 'Nh???p m??n H???c m??y v?? khai ph?? d??? li???u',
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
            subject_name: 'Nh???p m??n an to??n th??ng tin',
            term: '6',
            credit: 3,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT4244',
            subject_name: 'Qu???n tr??? d??? ??n CNTT',
            term: '8',
            credit: 2,
            credit_done: 0,
            mark: ''
        },
        {
            subject_id: 'IT4480',
            subject_name: 'L??m vi???c nh??m v?? k??? n??ng giao ti???p',
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