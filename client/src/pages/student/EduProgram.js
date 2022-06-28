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

function createData(name, count, total_credit, total_credit_done) {
    return {
        name,
        count,
        total_credit,
        total_credit_done,
        subjects: [
            {
                subject_id: 'IT5001',
                subject_name: 'Thực tập kỹ sư',
                term: 9,
                credit: 3,
                credit_done: 3,
                mark: 'A+'

            },
            {
                subject_id: 'SSH1151',
                subject_name: 'Tư tưởng HCM	',
                term: 3,
                credit: 2,
                credit_done: 2,
                mark: 'A+'
            },
        ],
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
                term: PropTypes.number.isRequired,
                credit: PropTypes.number.isRequired,
                credit_done: PropTypes.number.isRequired,
                mark: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

const rows = [
    createData('Đồ án/Khóa luận Tốt nghiệp', 1, 6, 0),
    createData('Tự chọn II', 2, 0, 0),
    createData('Thực tập tốt nghiệp 1', 1, 3, 0),
    createData('Lý luận chính trị + Pháp luật đại cương', 5, 12, 12),
    createData('Giáo dục thể chất', 2, 0, 0),
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