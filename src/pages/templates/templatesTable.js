import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTemplate, fetchALLTemplates, getAllTemplates, getLoading } from "store/reducers/templateSlice";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { hide, show } from 'store/reducers/loaderSlice';
import { Sorter } from 'common/sorter';
import { showError, showSuccess } from 'store/reducers/snackbarSlice';
import moment from "moment";
import { ButtonBase } from '@mui/material';
import ConfirmDialog from 'components/ConfirmDialog';

const TemplatesTable = ({ searchTerm, setSearchTerm }) => {
    const allTemplates = useSelector(getAllTemplates);
    const apiStatus = useSelector(getLoading);
    const dispatch = useDispatch();
    let contentToRender = "";
    const navigate = useNavigate();
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filterTemplates, setFilterTemplates] = useState()
    const [tableColumn, setTableColumn] = useState([]);

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
                    color: filtered ? '#FFFFFF' : undefined,
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
            compare: (a, b) => dataIndex == 'date_created' ? Sorter.DATE(b[[dataIndex]], a[[dataIndex]]) : Sorter.DEFAULT(b[[dataIndex]], a[[dataIndex]]),
            // multiple: 3,
        },
        render: (text) => {
            if (dataIndex == 'content') {
                return <span dangerouslySetInnerHTML={{ __html: text }}></span >;
            }
            if (dataIndex == 'date_created') {
                return moment(text).format('yyyy-MM-DD hh:mm')
            } else {
                return text;
            }
        }
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
            dataIndex: 'description',
            key: 'description',
            width: '20%',
            ...getColumnSearchProps('description'),
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
                        <ButtonBase
                            sx={{
                                p: 0.25,
                            }}
                            aria-label="Edit Template"
                            onClick={() => handleEditTemplate(record._id)}
                        ><EditOutlined /></ButtonBase>
                        <ButtonBase
                            sx={{
                                color: "red",
                                p: 0.25,
                            }}
                            aria-label="Delete Template"
                            onClick={() => handleDeleteTemplate(record._id)}
                        >
                            <DeleteOutlined /></ButtonBase>
                        {/* <EditOutlined onClick={() => handleEditTemplate(record._id)} style={{ marginRight: 8 }} />
                        <DeleteOutlined onClick={() => handleDeleteTemplate(record._id)} style={{ color: "red" }} /> */}
                    </>
                )
            }
        },
    ];


    const [pagination, setPagination] = useState();
    const [sorter, setSorter] = useState();
    const [filter, setFilter] = useState();

    const handleTableChange1 = (pagination, filter, sorter, extra) => {
        setPagination(pagination)
        setSorter(sorter)
        setFilter(filter)
        localStorage.setItem('filter', JSON.stringify({
            type: 'template', config: {
                pagination: pagination,
                sorter: sorter,
                filter: filter,
                globalSearchText: searchTerm
            }
        }))
        // filter.first_name = 'sean'
    };

    useEffect(() => {
        dispatch(show());
        if (allTemplates.length == 0) {
            dispatch(fetchALLTemplates());
        }
    }, [dispatch]);

    useEffect(() => {
        let filterConfig = JSON.parse(localStorage.getItem('filter'))
        // debugger
        if (filterConfig.type == 'template') {
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
        setFilterTemplates(allTemplates)
        dispatch(hide());
    }, [allTemplates]);

    useEffect(() => {
        if (allTemplates.length && searchTerm) {
            let filterData = allTemplates.filter(x => {
                if (x?.name?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase()?.trim()) ||
                    // x?.content?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase()?.trim()) ||
                    x?.description?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase()?.trim()))
                    return x;
            })
            localStorage.setItem('filter', JSON.stringify({
                type: 'template', config: {
                    pagination: pagination,
                    sorter: sorter,
                    filter: filter,
                    globalSearchText: searchTerm
                }
            }))
            setFilterTemplates(filterData)
        } else {
            setFilterTemplates(allTemplates)
        }

    }, [searchTerm, allTemplates]);

    const handleEditTemplate = (id) => {
        navigate(`/templates/detail/${id}`);
    }

    const handleDeleteTemplate = (id) => {
        Modal.confirm({
            title: 'Are you sure, you want  to delete this Template?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                dispatch(show());
                dispatch(deleteTemplate(id))
                    .unwrap()
                    .then(() => {
                        dispatch(showSuccess('Template deleted successfully!'))
                        dispatch(hide());
                        dispatch(fetchALLTemplates());
                    })
                    .catch(() => dispatch(showError('Something went wrong!')));
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
                {tableColumn?.length ? <Table columns={tableColumn} dataSource={filterTemplates}
                    pagination={pagination}
                    // onChange={handleTableChange1}
                    onChange={(val, filter, sorter, extra) => {
                        handleTableChange1(val, filter, sorter, extra);
                    }} /> : <></>}
                {/* <ConfirmDialog /> */}
            </>
        );

    return (
        <>
            {contentToRender}
        </>
    );
};

export default TemplatesTable;
