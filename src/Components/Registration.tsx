import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './css/Login.css'
import React, {useState} from "react";
import {enc, SHA256} from "crypto-js";
let _ = require('lodash');

function hashCode(str: string) {
    const password = SHA256(str).toString(enc.Hex);
    return password
}

async function addUser(name: string, surname: string, login: string, password: string) {
    let cookie = _.split(document.cookie,'=')[1]
    const response = await fetch("/api/users/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
            'X-CSRFToken': cookie
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            login: login,
            password: hashCode(password)
        })
    })
    const json = await response.json()
    return json
}

export function Registration() {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="form">
            <h1 className="title">Регистрация</h1>
            <Form onSubmit={e => {
                e.preventDefault()
                if (name == '' || surname == '' || login == '' || password == '') {
                    alert('Заполните все поля')
                }
                else {
                    addUser(name, surname, login, password).then(
                        value => {
                            window.location.href = '/login'
                        },
                        error => {
                            alert('Такой логин уже есть')
                        }
                    )
                }
            }}>
                <Form.Group className="mb-3">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control type="text" value={surname} placeholder="Фамилия" onChange={e => setSurname(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type="text" value={name} placeholder="Имя" onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Почта</Form.Label>
                    <Form.Control type="email" value={login} placeholder="Почта" onChange={e => setLogin(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" value={password} placeholder="Пароль" onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="dark" type="submit" className='submit' >
                    Отправить
                </Button>
            </Form>
        </div>
    )
}