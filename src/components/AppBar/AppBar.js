import React from 'react'
import './AppBar.scss'
import { Container as BootstrapContainer, Row, Col, InputGroup, FormControl } from 'react-bootstrap'

function AppBar() {
    return (
        <nav className="navbar-app">
            <BootstrapContainer className="Navbar-container">
                <Row>
                    <Col sm={4} xs={6} className="Col-no-padding">
                        <div className="App-actions">
                            <div className="item all"><i className="fa fa-th" /></div>
                            <div className="item home"><i className="fa fa-home" /></div>
                            <div className="item boards"><i className="fa fa-columns" /></div>
                            <div className="item search">
                                <InputGroup className="group-search">
                                    <FormControl
                                        className="input-search"
                                        placeholder="Jump to..."
                                    />
                                    <InputGroup.Text className="input-icon-search"><i className="fa fa-search"></i></InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                    </Col>
                    <Col sm={4} xs={1} className="Col-no-padding center">
                        <div className="app-branch text-center">
                            <a href="https://www.facebook.com/minhcuong.tran.374" target="_blank" rel="noreferrer">
                                <span className="slogan">minhcuongdev</span>
                            </a>
                        </div>
                    </Col>
                    <Col sm={4} xs={5} className="Col-no-padding">
                        <div className="user-actions">
                            <div className="item quick"><i className="fa fa-plus-square-o" /></div>
                            <div className="item news"><i className="fa fa-info-circle" /></div>
                            <div className="item notification"><i className="far fa-bell"></i></div>
                            <div className="item user-avatar">
                                <img src="https://i.ibb.co/4pfzCQt/minhcuongdev.jpg"
                                    alt="minhcuongdev"
                                    title="minhcuongdev"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    )
}

export default AppBar