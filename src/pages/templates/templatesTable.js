import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

// function createData(name, calories, fat, carbs, protein) {
//     return {
//         name,
//         calories,
//         fat,
//         carbs,
//         protein,
//     };
// }
function createData(id, name, description, modifiedDate, modifiedBy) {
    return {
        id, name, description, modifiedDate, modifiedBy
    };
}

const rows = [
    createData('7DAG50LPZBFYK2T', "OPT-OUT", "Opt Out message to customer", "2022-03-31 14:30:52", "Putha, Achyutha"),
    createData('7DAJRIFTQTVESQT', "FORGETME HOLD-REQUEST-HONORED", "message to customer when delete hold request processed", "2022-01-12 01:50:35", "Yenugu, Sathyadhar"),
    createData('7DAQEQEZL2ISTGS', "FORGETME HOLD-REQUEST", "message to customer when request hold flow completes", "2021-06-25 02:19:57", "Yenugu, Sathyadhari"),
    createData('7DAVQPWETZGOMYT', "HOLD-REQUEST", "message to customer when request hold flow completes", "2021-06-07 12:10:20", "Achyutha, Putha"),
    createData('7DASAIVPSFSRIDT', "Test Customer Send", "Send comment to customer", "2021-05-19 15:06:10", "Chilakapaty, Ankit - Dat..."),
    createData('7DAE24MPONLA9V2', "EXTEND-TIME", "message to customer when time extended to process request", "2021-04-26 14:27:47", "Putha, Achyutha"),
    createData('7DAZC8JGD6TRGOR', "EMAIL-VERIFY-EXPIRED", "Email verification expired message to customer", "2021-04-26 02:10:13", "Boyapati, Varun - Data"),
    createData('7DAUTNBZC7097SC', "FORGETME REQUEST-DECLINED", "message to customer when delete request declined", "2021-04-23 09:46:29", "Achyutha, Putha"),
    createData('7TDAWJEFFILMWCT', "FORGETME-REQUEST-HONORED", "message to customer when delete request processed", "2021-04-23 09:46:29", "Achyutha, Putha"),
    createData('7DAGITTYGYSDCYY', "FORGETME-REVIEW", "message to admin to review the DATA DELETION request", "2021-04-23 09:46:29", "Achyutha, Putha"),
    createData('7DAFOXRBZE1XPS5', "GETINFOREQUEST-HONORED", "message to customer when get info request processed", "2021-04-23 09:46:29", "Achyutha, Putha"),
    createData('7TDAEOGMQKSKGME', "GETINFOREQUEST.NOTFOUND", "message to customer when get info request information not found", "2021-04-23 09:46:29", "Achyutha, Putha"),
    // createData('7DAG50LPZBFYK2T', "", "Duplicate Request", "", 4, false, new Date(), "", "2/2"),
    // createData('7DAJRIFTQTVESQT', "", "Ready for verification", "", 42, false, new Date(), "", "2/2"),
    // createData('7DAQEQEZL2ISTGS', "", "Complete", "", 6, false, new Date(), "", "2/2"),
    // createData('7DAVQPWETZGOMYT', "koundanya rajan ke...", "Complete", "", 4, false, new Date(), "7DA Email Web Form", "2/2"),
    // createData('7DASAIVPSFSRIDT', "koundanya rajan ke...", "Complete", "", 3, false, new Date(), "7DA Email Web Form", "2/2"),
    // createData('7DAE24MPONLA9V2', "koundanya rajan ke...", "Complete", "", 6, false, new Date(), "7DA Email Web Form", "2/2"),
    // createData('7DAZC8JGD6TRGOR', "", "Email verification", "", 4, true, new Date(), "", "3/3"),
    // createData('7DAUTNBZC7097SC', "", "Email verification", "", 0, true, new Date(), "", "3/3"),
    // createData('7TDAWJEFFILMWCT', "", "Email verification", "", 7, true, new Date(), "", "3/3"),
    // createData('7DAGITTYGYSDCYY', "koundanya rajan ke...", "Complete", "", 0, true, new Date(), "7DA Email Web Form", "3/3"),
    // createData('7DAFOXRBZE1XPS5', "koundanya rajan ke...", "Complete", "", 2, true, new Date(), "7DA Email Web Form", "3/3"),
    // createData('7TDAEOGMQKSKGME', "koundanya rajan ke...", "Complete", "", 37, true, new Date(), "7DA Email Web Form", "3/3"),
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
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'modifiedDate',
        numeric: false,
        disablePadding: false,
        label: 'Modified Date',
    },
    {
        id: 'modifiedBy',
        numeric: false,
        disablePadding: false,
        label: 'Modified By',
    }
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Templates
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function TemplatesTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%' }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        // onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => handleClick(event, row.id)}
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        {/* <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.id}
                                        </TableCell> */}
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.modifiedDate}</TableCell>
                                        <TableCell>{row.modifiedBy}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {/* <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            /> */}
        </Box>
    );
}