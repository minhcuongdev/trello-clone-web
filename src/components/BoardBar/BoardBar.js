import React from 'react'
import './BoardBar.scss'
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap'

function BoardBar() {
    return (
        <nav className="navbar-board">
            <BootstrapContainer className="Container">
                <Row>
                    <Col sm={8} xs={12} className="col-no-padding">
                        <div className="board-info">
                            <div className="item board-logo-icon">
                                <i className="fa fa-coffee"></i>
                                &nbsp;&nbsp;<strong>minhcuongdev REACTJS</strong>
                            </div>
                            <div className="divider"></div>

                            <div className="item board-type">Private Workspace</div>
                            <div className="divider"></div>

                            <div className="item member-avatar">
                                <img src="https://i.ibb.co/4pfzCQt/minhcuongdev.jpg"
                                    alt="minhcuongdev"
                                    title="minhcuongdev"
                                />
                                <span className="more-members">+1</span>
                                <span className="invite">Invite</span>
                            </div>

                        </div>
                    </Col>
                    <Col className="col-no-padding" sm={4} xs={12}>
                        <div className="board-actions">
                            <div className="item menu"><i className="fa fa-ellipsis-h mr-2"></i>Show menu</div>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    )
}

export default BoardBar