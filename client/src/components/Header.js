import { BsPlusLg, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Cards from './Cards';
import React, { useState } from "react";

import { Button, Container, Form, Navbar, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


function Header() {
    const [serchValue, setSearchValue] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [type, setType] = useState('Profit');

    const options = [
        'Profit', 'Loss'
    ]

    function serchProducts(data) {
        setSearchValue(data.target.value)
    }

    const defaultOption = options[0];
    function getProductByFilter(element) {
        setFilterValue(element.target.value);
    }

    function handleChange (e){
        setType(e.value);
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Row className='w-100'>
                        <Col md={4}>
                            <h2> Web Sultanate </h2>
                        </Col>
                        <Col md={2}>
                            <Link to="/product" style={{ 'color': 'white', 'textDecoration': 'none' }}><Button variant="success"><BsPlusLg /> Add Products</Button></Link>
                        </Col>
                        <Col md={1} style={{'fontSize': 'larger', 'textAlign': 'end', 'lineHeight': '35px'}}>
                            <Dropdown options={options} value={defaultOption} onChange={e => handleChange(e)} />
                        </Col>
                        <Col md={2}>
                            <Form.Control onKeyUp={(e) => getProductByFilter(e)} placeholder="Enter Profit/Loss (%)" />
                        </Col>
                        <Col md={3}>
                            <Form className="d-flex nav navbar-nav navbar-right">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search" style={{ width: '80%' }}
                                    onKeyUp={(e) => serchProducts(e)}
                                />
                                <div style={{ fontSize: 'larger', 'marginLeft': '3%' }}>
                                    <BsSearch />
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
            < Cards serchValue={serchValue} filterValue={filterValue} type={type}/>
        </>
    );
}

export default Header;