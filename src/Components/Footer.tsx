import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import "./css/Footer.css"
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";

export function Footer() {
    //offcanvas
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Container className="footer-closed" fluid>
            <Row>
                <Col>
                    <div className="info-btn"><Button className="info-btn" onClick={handleShow}>Контакты</Button></div>
                </Col>
            </Row>
            <Offcanvas className="footer" backdrop={false} scroll={true} show={show} onHide={handleClose} placement="bottom">
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <Col>
                            <h3 className="title">Модуль и Модуль</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} sm={6} md={3} className="contact">
                            <a>Вконтакте</a>
                        </Col>
                        <Col xs={6} sm={6} md={3} className="contact">
                            <a>Telegram</a>
                        </Col>
                        <Col xs={6} sm={6} md={3} className="contact">
                            <a>Почта</a>
                        </Col>
                        <Col xs={6} sm={6} md={3} className="contact">
                            <a>Телефон</a>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
}