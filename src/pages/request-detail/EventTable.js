import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

function createData(eventName, eventStartDate, eventEndDate, eventStatus) {
    return { eventName, eventStartDate, eventEndDate, eventStatus };
}

const rows = [
    createData('Post Verification email to requester', new Date(), new Date(), 1),
    createData('Verify Email', new Date(), new Date(), 1),
    // createData(98756325, 'Mobile', 355, 1, 90989),
    // createData(98652366, 'Handset', 50, 1, 10239),
    // createData(13286564, 'Computer Accessories', 100, 1, 83348),
    // createData(86739658, 'TV', 99, 0, 410780),
    // createData(13256498, 'Keyboard', 125, 2, 70999),
    // createData(98753263, 'Mouse', 89, 2, 10570),
    // createData(98753275, 'Desktop', 185, 1, 98063),
    // createData(98753291, 'Chair', 100, 0, 14001)
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'eventName',
        align: 'left',
        disablePadding: false,
        label: 'Event'
    },
    {
        id: 'eventStartDate',
        align: 'left',
        disablePadding: true,
        label: 'Event Start Date Time'
    },
    {
        id: 'eventEndDate',
        align: 'left',
        disablePadding: false,
        label: 'Event End Date Time'
    },
    {
        id: 'eventStatus',
        align: 'left',
        disablePadding: false,
        label: 'Event Status'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Complete';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function EventsTable() {
    const [order] = useState('asc');
    const [orderBy] = useState('eventName');
    const [selected] = useState([]);

    const isSelected = (eventName) => selected.indexOf(eventName) !== -1;

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                    {/* <TableBody>
                        {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.eventName);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={index}
                                    selected={isItemSelected}
                                >
                                    <TableCell component="th" id={labelId} scope="row">
                                        <Link color="secondary" component={RouterLink} to="">
                                            {row.eventName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.eventName}</TableCell>
                                    <TableCell>{new Date(row.eventStartDate).toLocaleString()}</TableCell>
                                    <TableCell>{new Date(row.eventEndDate).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <OrderStatus status={row.eventStatus} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody> */}
                </Table>
            </TableContainer>
        </Box>
    );
}
