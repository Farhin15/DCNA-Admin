import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchALLUsers, getAllUsers, getLoading } from "store/reducers/userSlice";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { hide, show } from 'store/reducers/loaderSlice';

const UsersTable = () => {
    const allCars = useSelector(getAllUsers);
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
        console.log(allCars);
        if (allCars.length == 0) {
            dispatch(fetchALLUsers());
        }
        console.log(allCars);
    }, [dispatch]);

    useEffect(() => {
        if (allCars.length == 0) {
            dispatch(show());
            // dispatch(showError("Success!"));
        } else {
            dispatch(hide());
        }

    }, [allCars]);

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
                <Table columns={columns} dataSource={allCars} />
            </>
        );

    return (
        <>
            {contentToRender}
        </>
    );
};

export default UsersTable;
