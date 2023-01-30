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

async function loginUser(login: string, password: string) {
    let cookie = _.split(document.cookie,'=')[1]
    const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
            'X-CSRFToken': cookie
        },
        body: JSON.stringify({login: login, password: hashCode(password)})
    })
    const json = await response.json()
    return json
}

export function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="form">
            <h1 className="title">Вход</h1>
            <Form onSubmit={e => {
                e.preventDefault()
                loginUser(login, password).then(
                    value => {
                        console.log(_.split(document.cookie,'=')[1])
                        localStorage.setItem('mim_key', value.key)
                        window.location.href = '/'
                    },
                    error => {
                        alert('Неверные данные')
                    }
                )
            }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Почта</Form.Label>
                    <Form.Control type="email" value={login} onChange={e => setLogin(e.target.value)} placeholder="Почта"/>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль"/>
                </Form.Group>
                <Button variant="dark" type="submit" className='submit'>
                    Войти
                </Button>
            </Form>
        </div>
    )
}