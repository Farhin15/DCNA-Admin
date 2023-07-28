import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchALLUsers, getAllUsers, getLoading } from "store/reducers/userSlice";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { hide, show } from 'store/reducers/loaderSlice';
import { Sorter } from 'common/sorter';
import * as XLSX from 'xlsx';
import * as FileSaver from "file-saver";

const UsersTable = ({ searchTerm, isExport }) => {
    const allUsers = useSelector(getAllUsers);
    const [filterUser, setFilterUser] = useState([])
    const apiStatus = useSelector(getLoading);
    const dispatch = useDispatch();
    let contentToRender = "";
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
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
            text
    });
    const columns = [
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            width: '25%',
            ...getColumnSearchProps('username'),
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
            width: '20%',
            ...getColumnSearchProps('first_name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email')
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '30%',
            key: 'address',
            ...getColumnSearchProps('address')
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '10%',
            render: (item, record) => {
                return (
                    <>
                        <EditOutlined onClick={() => handleEditUser(record._id)} />
                        <DeleteOutlined onClick={() => handleDeleteUser(record._id)} style={{ color: "red", marginLeft: 12 }} />
                    </>
                )
            }
        },
    ];


    useEffect(() => {
        console.log(allUsers);
        if (allUsers.length == 0) {
            dispatch(fetchALLUsers());
        }
        console.log(allUsers);
    }, [dispatch]);

    useEffect(() => {
        if (allUsers.length == 0) {
            dispatch(show());
            // dispatch(showError("Success!"));
        } else {
            setFilterUser(allUsers)
            dispatch(hide());
        }

    }, [allUsers]);

    useEffect(() => {
        if (allUsers.length && searchTerm) {
            let filterData = allUsers.filter(x => {
                if (x?.username?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase()?.trim()) ||
                    x?.first_name?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase()?.trim()) ||
                    x?.email?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase()?.trim()) ||
                    x?.address?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase()?.trim()))
                    return x;
            })
            setFilterUser(filterData)
        } else {
            setFilterUser(allUsers)
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
        if (filterUser.length && isExport) {
            if (filterUser?.length > 0) {
                let list = filterUser;

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
                FileSaver.saveAs(data, 'Users' + fileExtension);
            }
        }

    }, [isExport]);

    const handleEditUser = (id) => {
        navigate(`/users/user-detail/${id}`);
    }

    const handleDeleteUser = (id) => {
        Modal.confirm({
            title: 'Are you sure, you want  to delete this category?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                dispatch(deleteUser(id))
                    .unwrap()
                    .then(() => {
                        dispatch(fetchALLUsers());
                    });
            }
        })
    };

    contentToRender =
        apiStatus === "pending" ? (
            <>
                <div className=" d-flex align-items-center justify-content-center">
                    {/* <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> */}
                </div>
            </>
        ) : (
            <>
                <Table columns={columns} dataSource={filterUser} />
            </>
        );

    return (
        <>
            {contentToRender}
        </>
    );
};

export default UsersTable;
