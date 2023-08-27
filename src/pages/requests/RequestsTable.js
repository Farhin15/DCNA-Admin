import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchALLRequests, getAllRequests, getLoading } from 'store/reducers/requestSlice';
import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { hide, show } from 'store/reducers/loaderSlice';
import { Sorter } from 'common/sorter';
import * as XLSX from 'xlsx';
import * as FileSaver from "file-saver";
import moment from "moment";

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

export default function RequestsTable({ searchTerm, isExport, setSearchTerm }) {
    const allRequests = useSelector(getAllRequests);
    const apiStatus = useSelector(getLoading);
    const dispatch = useDispatch();
    // const data = useGetAllPostQuery()?.data?.data?.data
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filterRequests, setFilterRequests] = useState([])
    const [tableColumn, setTableColumn] = useState([]);

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                role='presentation'
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button> */}
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#FFFFFF' : undefined,
                }}
            />
        ),
        width: dataIndex == '_id' ? '55%' : dataIndex == 'date_created' || dataIndex == 'days_left' || dataIndex == 'request_type' ? '25%' : 'auto',
        onFilter: (value, record) =>
            record[dataIndex]?.toString()?.toLowerCase()?.includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        sorter: {
            compare: (a, b) => dataIndex == 'date_created' ? Sorter.DATE(b[[dataIndex]], a[[dataIndex]]) : Sorter.DEFAULT(b[[dataIndex]], a[[dataIndex]]),
            // multiple: 3,
        },
        render: (text, record) =>
            dataIndex === '_id' ? (
                <Link component={RouterLink} to={`/requests/request-detail/${text}`}>
                    {text}
                </Link>
            ) :
                dataIndex === 'date_created' ?
                    moment(text).format('yyyy-MM-DD hh:mm') :
                    dataIndex === 'first_name' ? text + ' ' + record?.last_name
                        : text
    });

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (text) => <a>{text}</a>,
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            ...getColumnSearchProps('_id')
        },
        {
            title: 'Name',
            dataIndex: 'first_name',
            // sorter: (a, b) => a.first_name - b.first_name,
            ...getColumnSearchProps('first_name')

        },
        {
            title: 'Stage',
            dataIndex: 'address',
            ...getColumnSearchProps('address')
            // filters: [
            //     {
            //         text: 'London',
            //         value: 'London',
            //     },
            //     {
            //         text: 'New York',
            //         value: 'New York',
            //     },
            // ],
            // onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Request Type',
            dataIndex: 'request_type',
            ...getColumnSearchProps('request_type')
        },
        {
            title: 'Days Left',
            dataIndex: 'days_left',
            ...getColumnSearchProps('days_left')
        },
        {
            title: 'Extended',
            dataIndex: 'extended',
            ...getColumnSearchProps('extended')
        },
        {
            title: 'Date Created',
            dataIndex: 'date_created',
            ...getColumnSearchProps('date_created')
        },
        {
            title: 'Source',
            dataIndex: 'source',
        },
        {
            title: 'Completed',
            dataIndex: 'completed',
        }
    ];
    const [pagination, setPagination] = useState();
    const [sorter, setSorter] = useState();
    const [filter, setFilter] = useState();

    const handleTableChange1 = (pagination, filter, sorter, extra) => {
        setPagination(pagination)
        setSorter(sorter)
        setFilter(filter)
        localStorage.setItem('filter', JSON.stringify({
            type: 'request', config: {
                pagination: pagination,
                sorter: sorter,
                filter: filter,
                globalSearchText: searchTerm
            }
        }))
        // filter.first_name = 'sean'
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    useEffect(() => {
        dispatch(show());
        if (allRequests.length == 0) {
            dispatch(fetchALLRequests());
        }
    }, [dispatch]);

    useEffect(() => {
        setFilterRequests(allRequests);
        dispatch(hide());
    }, [allRequests]);

    useEffect(() => {
        let filterConfig = JSON.parse(localStorage.getItem('filter'))
        // debugger
        if (filterConfig.type == 'request') {
            setSearchTerm(filterConfig.config.globalSearchText);
            setPagination(filterConfig.config.pagination)
            columns.map(x => {
                if (x.dataIndex == filterConfig.config?.sorter?.field) {
                    x.defaultSortOrder = filterConfig.config?.sorter?.order ?? ''
                }
                return x;
            })
            setTableColumn(columns);
        } else {
            setTableColumn(columns);
        }
    }, [])

    useEffect(() => {
        if (allRequests.length && searchTerm) {
            let filterData = allRequests.filter(x => {
                if (x?.request_type?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase()?.trim()) ||
                    x?._id?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase()?.trim()) ||
                    x?.first_name?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase()?.trim()))
                    return x;
            })
            localStorage.setItem('filter', JSON.stringify({
                type: 'request', config: {
                    pagination: pagination,
                    sorter: sorter,
                    filter: filter,
                    globalSearchText: searchTerm
                }
            }))
            setFilterRequests(filterData)
        } else {
            setFilterRequests(allRequests);
        }

    }, [searchTerm, allRequests]);

    function tableToCSVNew(data_table, type) {
        // Variable to store the final csv data
        var csv_data = [];
        // Get each row data
        var rows = data_table;
        var cols = Object.keys(rows[0]);

        var rowsNew = rows[0];
        // var rowCount = Object.keys(rowsNew).length;

        for (var i = 0; i < rows.length; i++) {
            // Get each column data
            var csvrow = [];
            var count = 1;

            if (csv_data.length === 0) {
                for (let j = 0; j < cols.length; j++) {
                    let density = "density_" + count;
                    let frequency = "frequency_" + count;
                    if (rowsNew[cols[j]] != null && (rowsNew[cols[j]].hasOwnProperty(density) || rowsNew[cols[j]].hasOwnProperty(frequency))) {
                        let colName = cols[j][0].toUpperCase() + cols[j].slice(1);
                        csvrow.push(colName);
                        csvrow.push("");
                        count++;
                    } else if (rowsNew[cols[j]] != null && (rowsNew[cols[j]].hasOwnProperty("Rank") || rowsNew[cols[j]].hasOwnProperty("URL"))) {
                        let colName = cols[j][0].toUpperCase() + cols[j].slice(1);
                        csvrow.push(colName);
                        csvrow.push("");
                        count++;
                    } else {
                        let colName = cols[j][0].toUpperCase() + cols[j].slice(1);
                        csvrow.push(colName);
                    }

                    if (count > 3)
                        count = 1;
                }
                if (type === "EXCEL") {
                    csv_data.push(csvrow.join(",,"));
                } else {
                    csv_data.push(csvrow.join(","));
                }

                csvrow = [];
                count = 1;
                if (Object.values(rowsNew).filter(a => typeof (a) == 'object').length > 0 && Object.values(rowsNew).filter(a => typeof (a) == 'object').findIndex(e => e !== null) > -1) {
                    for (let j = 0; j < cols.length; j++) {
                        let density = "density_" + count;
                        let frequency = "frequency_" + count;
                        if (rowsNew[cols[j]] != null && (rowsNew[cols[j]].hasOwnProperty(density) || rowsNew[cols[j]].hasOwnProperty(frequency))) {
                            let densityColName = "density";
                            let frequencyColName = "frequency";
                            csvrow.push(densityColName);
                            csvrow.push(frequencyColName);
                            count++;
                        } else if (rowsNew[cols[j]] != null && (rowsNew[cols[j]].hasOwnProperty("Rank") || rowsNew[cols[j]].hasOwnProperty("URL"))) {
                            csvrow.push("Rank");
                            csvrow.push("URL");
                            count++;
                        } else {
                            csvrow.push("");
                        }

                        if (count > 3)
                            count = 1;
                    }
                    if (type === "EXCEL") {
                        csv_data.push(csvrow.join(",,"));
                    } else {
                        csv_data.push(csvrow.join(","));
                    }
                }
            }

            csvrow = [];
            count = 1;
            // Stores each csv row data
            for (let j = 0; j < cols.length; j++) {
                // Get the text data of each cell
                // of a row and push it to csvrow
                let density = "density_" + count;
                let frequency = "frequency_" + count;
                if (rowsNew[cols[j]] != null && (rowsNew[cols[j]].hasOwnProperty(density) || rowsNew[cols[j]].hasOwnProperty(frequency))) {
                    csvrow.push(rows[i][cols[j]][density]);
                    csvrow.push(rows[i][cols[j]][frequency]);
                    count++;
                } else if (rowsNew[cols[j]] != null && (rowsNew[cols[j]].hasOwnProperty("Rank") || rowsNew[cols[j]].hasOwnProperty("URL"))) {
                    csvrow.push(rows[i][cols[j]]["Rank"]);
                    csvrow.push(rows[i][cols[j]]["URL"]);
                    count++;
                } else {
                    csvrow.push(rows[i][cols[j]]);
                }

                if (count > 3)
                    count = 1;
            }
            // Combine each column value with comma
            if (type === "EXCEL") {
                csv_data.push(csvrow.join(",,"));
            }
            else {
                csv_data.push(csvrow.join(","));
            }
        }
        // Combine each row data with new line character
        if (type === "EXCEL") {
            csv_data = csv_data.join("\n");
        } else {
            csv_data = csv_data.join("\n");
        }

        return csv_data;
    }

    useEffect(() => {
        if (filterRequests.length && isExport) {
            if (filterRequests?.length > 0) {
                let list = filterRequests;

                let exportList = list?.map((data) => {
                    const { key, ...rest } = data;
                    return rest;
                });

                let exportListArray = tableToCSVNew(exportList, "EXCEL");
                let csvFileTxt = exportListArray.toString();
                let arrayOfArrayCsv = csvFileTxt.split("\n").map((row) => {
                    return row.split(",,")
                });

                const fileType =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                const fileExtension = ".xlsx";

                const ws = XLSX.utils.aoa_to_sheet(arrayOfArrayCsv);
                const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
                const data = new Blob([excelBuffer], { type: fileType });
                FileSaver.saveAs(data, 'Requests' + fileExtension);
            }
        }

    }, [isExport]);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%' }}>
                {tableColumn?.length ? <Table columns={tableColumn} dataSource={filterRequests}
                    pagination={pagination}
                    // onChange={handleTableChange1}
                    onChange={(val, filter, sorter, extra) => {
                        handleTableChange1(val, filter, sorter, extra);
                    }} /> : <></>}
            </Paper>
        </Box>
    );
}