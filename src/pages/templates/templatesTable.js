import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTemplate, fetchALLTemplates, getAllTemplates, getLoading } from "store/reducers/templateSlice";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { hide, show } from 'store/reducers/loaderSlice';

const TemplatesTable = () => {
    const allCars = useSelector(getAllTemplates);
    const apiStatus = useSelector(getLoading);
    const dispatch = useDispatch();
    let contentToRender = "";
    const navigate = useNavigate();
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Description',
            dataIndex: 'content',
            key: 'content',
            width: '20%',
            ...getColumnSearchProps('content'),
        },
        {
            title: 'Modified Date',
            dataIndex: 'date_created',
            key: 'date_created',
            ...getColumnSearchProps('date_created'),
            // sorter: (a, b) => a.date_created - b.date_created,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            render: (item, record) => {
                return (
                    <>
                        <EditOutlined onClick={() => handleEditTemplate(record._id)} />
                        <DeleteOutlined onClick={() => handleDeleteTemplate(record._id)} style={{ color: "red", marginLeft: 12 }} />
                    </>
                )
            }
        },
    ];


    useEffect(() => {
        console.log(allCars);
        if (allCars.length == 0) {
            dispatch(fetchALLTemplates());
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

    const handleEditTemplate = (id) => {
        navigate(`/templates/detail/${id}`);
    }

    const handleDeleteTemplate = (id) => {
        Modal.confirm({
            title: 'Are you sure, you want  to delete this category?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                dispatch(deleteTemplate(id))
                    .unwrap()
                    .then(() => {
                        dispatch(fetchALLTemplates());
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

export default TemplatesTable;
