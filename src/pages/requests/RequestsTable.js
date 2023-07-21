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

export default function RequestsTable() {
    const allCars = useSelector(getAllRequests);
    const apiStatus = useSelector(getLoading);
    const dispatch = useDispatch();
    // const data = useGetAllPostQuery()?.data?.data?.data
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');


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
            dataIndex: 'extended',
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
        if (allCars.length == 0) {
            dispatch(fetchALLRequests());
            // dispatch(showError("Success!"));
        }

    }, [dispatch]);

    useEffect(() => {
        if (allCars.length == 0) {
            dispatch(show());
            // dispatch(showError("Success!"));
        } else {
            dispatch(hide());
        }

    }, [allCars]);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%' }}>
                <Table columns={columns} dataSource={allCars} />
            </Paper>
        </Box>
    );
}