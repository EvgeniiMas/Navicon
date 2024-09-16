import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Creator from './Creator';

function App() {
    const orderSort = {
        asc: 0,
        desc: 1
    };
    const columnSort = {
        id: 0,
        firstname: 1,
        lastname: 2,
        email: 3,
        phone: 4
    }
    const compareFunctions = [
        {
            order: orderSort.asc,
            column: columnSort.id,
            compare: (firstRow, secondRow) => firstRow.id < secondRow.id ? -1 : 1
        },
        {
            order: orderSort.desc,
            column: columnSort.id,
            compare: (firstRow, secondRow) => firstRow.id > secondRow.id ? -1 : 1
        },
        {
            order: orderSort.asc,
            column: columnSort.firstname,
            compare: (firstRow, secondRow) => firstRow.firstName.localeCompare(secondRow.firstName)
        },
        {
            order: orderSort.desc,
            column: columnSort.firstname,
            compare: (firstRow, secondRow) => -1 * firstRow.firstName.localeCompare(secondRow.firstName)
        },
        {
            order: orderSort.asc,
            column: columnSort.lastname,
            compare: (firstRow, secondRow) => firstRow.lastName.localeCompare(secondRow.lastName)
        },
        {
            order: orderSort.desc,
            column: columnSort.lastname,
            compare: (firstRow, secondRow) => -1 * firstRow.lastName.localeCompare(secondRow.lastName)
        },
        {
            order: orderSort.asc,
            column: columnSort.email,
            compare: (firstRow, secondRow) => firstRow.email.localeCompare(secondRow.email)
        },
        {
            order: orderSort.desc,
            column: columnSort.email,
            compare: (firstRow, secondRow) => -1 * firstRow.email.localeCompare(secondRow.email)
        },
        {
            order: orderSort.asc,
            column: columnSort.phone,
            compare: (firstRow, secondRow) => firstRow.phone.localeCompare(secondRow.phone)
        },
        {
            order: orderSort.desc,
            column: columnSort.phone,
            compare: (firstRow, secondRow) => -1 * firstRow.phone.localeCompare(secondRow.phone)
        }
    ];
    const rowsOnPage = 50;
    const tinyDataUrl = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
    const largeDataUrl = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

    const [data, setData] = useState();
    const [filtredData, setFiltredData] = useState();
    const [isLoadingNow, setIsLoadingNow] = useState(false);
    const [page, setPage] = useState(1);
    const [isShowCreator, setIsShowCreator] = useState(false);
    const [selectedRow, setSelectedRow] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrderSort, setSelectedOrderSort] = useState(orderSort.asc);
    const [selectedColumnSort, setSelectedColumnSort] = useState(columnSort.id);

    const loadData = (url) => {
        setIsLoadingNow(true);
        setSelectedRow();
        setSearchQuery('');
        axios.get(url)
            .then(
                (resp) => {
                    setData(resp.data);
                    setFiltredData(resp.data);
                    setIsLoadingNow(false);
                },
                (error) => {
                    setIsLoadingNow(false);
                    console.error(error.message);
                }
            );
    } 

    const loadTinyData = () => {
        loadData(tinyDataUrl);
    }

    const loadLargeData = () => {
        loadData(largeDataUrl);
    }

    const previuousPage = () => {
        setPage(page - 1);
    }

    const nextPage = () => {
        setPage(page + 1);
    }

    const handleCloseCreator = () => {
        setIsShowCreator(false);
    }

    const handleShowCreator = () => {
        setIsShowCreator(true);
    }

    const create = (id, firstName, lastName, email, phone) => {
        let increasedData = [{ id, firstName, lastName, email, phone }, ...data]
        setData(increasedData);
        setFiltredData(increasedData.filter(isMatchSearchQuery));
    }

    const handleSelectRow = (row) => {
        setSelectedRow(row);
    }

    const handleChangeSearchQuery = (e) => {
        setSearchQuery(e.target.value);
    }

    const applyFilter = () => {
        setPage(1);
        setFiltredData(data.filter(isMatchSearchQuery));
    }

    const isMatchSearchQuery = (row) => {
        return row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
               row.phone.toLowerCase().includes(searchQuery.toLowerCase());
    }

    const defineSortParams = (columnSort) => {
        if (selectedColumnSort === columnSort) {
            setSelectedOrderSort(selectedOrderSort === orderSort.asc
                ? orderSort.desc
                : orderSort.asc
            );
        } else {
            setSelectedOrderSort(orderSort.asc);
            setSelectedColumnSort(columnSort);
        }
    }

    return (
        <Container>
            {/*хидер*/}
            <Row className="my-1">
                <Col md="auto">
                    <Button variant="primary" onClick={loadTinyData} disabled={isLoadingNow}>Load tiny data</Button>
                </Col>
                <Col md="auto">
                    <Button variant="primary" onClick={loadLargeData} disabled={isLoadingNow}>Load large data</Button>
                </Col>
                <Col className="ms-auto" md="auto">
                    <Form.Control
                        disabled={isLoadingNow || data == null}
                        placeholder="Search query"
                        value={searchQuery}
                        onChange={handleChangeSearchQuery}
                    />
                </Col>
                <Col className="me-auto" md="auto">
                    <Button variant="primary" onClick={applyFilter} disabled={isLoadingNow || data == null}>Apply</Button>
                </Col>
                <Col md="auto">
                    <Button variant="primary" onClick={handleShowCreator} disabled={isLoadingNow || data == null}>Add row</Button>
                </Col>
            </Row>
            {/*таблица с данными*/}
            <Row>
                {isLoadingNow && <Spinner className="mx-auto" animation="grow" />}
                {!isLoadingNow && data != null
                    ? <Table className="mx-auto" striped>
                        <thead>
                            <tr>
                                <th onClick={() => { defineSortParams(columnSort.id); }}>
                                    {selectedColumnSort === columnSort.id
                                        ? selectedOrderSort === orderSort.asc
                                            ? "▲"
                                            : "▼"
                                        : null
                                    }
                                    id
                                </th>
                                <th onClick={() => { defineSortParams(columnSort.firstname); }}>
                                    {selectedColumnSort === columnSort.firstname
                                        ? selectedOrderSort === orderSort.asc
                                            ? "▲"
                                            : "▼"
                                        : null
                                    }
                                    firstName
                                </th>
                                <th onClick={() => { defineSortParams(columnSort.lastname); }}>
                                    {selectedColumnSort === columnSort.lastname
                                        ? selectedOrderSort === orderSort.asc
                                            ? "▲"
                                            : "▼"
                                        : null
                                    }
                                    lastName
                                </th>
                                <th onClick={() => { defineSortParams(columnSort.email); }}>
                                    {selectedColumnSort === columnSort.email
                                        ? selectedOrderSort === orderSort.asc
                                            ? "▲"
                                            : "▼"
                                        : null
                                    }
                                    email
                                </th>
                                <th onClick={() => { defineSortParams(columnSort.phone); }}>
                                    {selectedColumnSort === columnSort.phone
                                        ? selectedOrderSort === orderSort.asc
                                            ? "▲"
                                            : "▼"
                                        : null
                                    }
                                    phone
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtredData
                                .sort((first, second) => {
                                    var sortFunction = compareFunctions.filter((f) =>
                                        f.column === selectedColumnSort &&
                                        f.order === selectedOrderSort
                                    )[0];

                                    if (sortFunction == null) {
                                        console.error("Compare function is not defined");
                                        return 1;
                                    }

                                    return sortFunction.compare(first, second);
                                })
                                .slice(rowsOnPage * (page - 1), rowsOnPage * page)
                                .map((row, index) => 
                                <tr key={index} onClick={() => { handleSelectRow(row); }}>
                                    <td>{row.id}</td>
                                    <td>{row.firstName}</td>
                                    <td>{row.lastName}</td>
                                    <td>{row.email}</td>
                                    <th>{row.phone}</th>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    : null
                }
            </Row>  
            {/*пагинация*/}
            {!isLoadingNow && data != null && filtredData.length > rowsOnPage
                ? <Row className="my-1">
                    <Col md="auto">
                        <Button variant="primary" onClick={previuousPage} disabled={page <= 1}>Previous page</Button>
                    </Col>
                    <Col md="auto" className="m-auto">
                        { page }
                    </Col>
                    <Col md="auto">
                        <Button variant="primary" onClick={nextPage} disabled={page >= filtredData.length / rowsOnPage}>Next page</Button>
                    </Col>
                </Row>
                : null
            }
            {/*детализация выбранной строки*/}
            {selectedRow != null
                ? <Row className="my-1">
                    <Col md="auto">
                        Выбран пользователь: <b>{selectedRow.firstName} {selectedRow.lastName}</b> <br />
                        Описание:<br />
                        <textarea readOnly value={selectedRow.description} /><br />
                        Адрес проживания: <b>{selectedRow.address?.streetAddress ?? ""}</b><br />
                        Город: <b>{selectedRow.address?.city ?? ""}</b><br />
                        Провинция/штат: <b>{selectedRow.address?.state ?? ""}</b><br />
                        Индекс: <b>{selectedRow.address?.zip ?? ""}</b>
                    </Col>
                </Row>
                : null
            }
            <Creator show={isShowCreator} handleClose={handleCloseCreator} handleCreate={create} />
        </Container>
    )
}

export default App