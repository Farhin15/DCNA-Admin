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

export default function RequestsTable({ searchTerm, isExport }) {
    const allRequests = useSelector(getAllRequests);
    const apiStatus = useSelector(getLoading);
    const dispatch = useDispatch();
    // const data = useGetAllPostQuery()?.data?.data?.data
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filterRequests, setFilterRequests] = useState([])
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
                    <Button
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
                    </Button>
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
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString()?.toLowerCase()?.includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        sorter: {
            compare: (a, b) => Sorter.DEFAULT(a[[dataIndex]], b[[dataIndex]]),
            multiple: 3,
        },
        render: (text) =>
            dataIndex === '_id' ? (
                <Link component={RouterLink} to={`/requests/request-detail/${text}`}>
                    {text}
                </Link>
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            width: '30%',
            render: (text) => <a>{text}</a>,
            // filters: [
            //     {
            //         text: 'Joe',
            //         value: 'Joe',
            //     },
            //     {
            //         text: 'Jim',
            //         value: 'Jim',
            //     },
            //     {
            //         text: 'Submenu',
            //         value: 'Submenu',
            //         children: [
            //             {
            //                 text: 'Green',
            //                 value: 'Green',
            //             },
            //             {
            //                 text: 'Black',
            //                 value: 'Black',
            //             },
            //         ],
            //     },
            // ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            // render: (text) => {
            //     <Link component={RouterLink} to={`/request-detail/${text}`}>
            //         {text}
            //     </Link>
            // },
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
        if (allRequests.length == 0) {
            dispatch(fetchALLRequests());
            // dispatch(showError("Success!"));
        }

    }, [dispatch]);

    useEffect(() => {
        if (allRequests.length == 0) {
            dispatch(show());
            // dispatch(showError("Success!"));
        } else {
            setFilterRequests(allRequests);
            dispatch(hide());
        }

    }, [allRequests]);

    useEffect(() => {
        if (allRequests.length && searchTerm) {
            let filterData = allRequests.filter(x => {
                if (x?.request_type?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase()?.trim()) ||
                    x?.first_name?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase()?.trim()))
                    return x;
            })
            setFilterRequests(filterData)
        } else {
            setFilterRequests(allRequests);
        }

    }, [searchTerm]);

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
                <Table columns={columns} dataSource={filterRequests} />
            </Paper>
        </Box>
    );
}