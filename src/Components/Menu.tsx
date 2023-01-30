import React, {useState} from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Menu() {
    return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">МиМ</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Главная</Nav.Link>
            {localStorage.getItem('mim_key') != null && <Nav.Link href="/profile">Личный кабинет</Nav.Link> }
          </Nav>
          <Nav>
            {localStorage.getItem('mim_key') == null && <Nav.Link href="/registration">Регистрация</Nav.Link> }
            {localStorage.getItem('mim_key') == null && <Nav.Link href="/login">Вход</Nav.Link> }
            {localStorage.getItem('mim_key') != null && <Navbar.Text>Баланас: #</Navbar.Text> }
            {localStorage.getItem('mim_key') != null && <Nav.Link href="/logout">Выход</Nav.Link> }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}