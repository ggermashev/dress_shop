import React, {Fragment, useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Col, Image, Pagination, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {Range} from 'react-range';
import "./css/Main.css"
import "./css/Logo.css"
import {Filters} from "./Filters";
import {PriceRange} from "./PriceRange";
import {MyPagination} from "./MyPagination";
import {DressRow} from "./DressRow";

let _ = require('lodash');

async function get_dress() {
    const response = await fetch('/api/dress/')
    const json = await response.json()
    return json
}

async function get_slots() {
    const response = await fetch('/api/slots/')
    const json = await response.json()
    return json
}

export function Main() {
    //Offcanvas
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //react-range
    const [valsfrom, setValsfrom] = useState<number[]>([0])
    const [valsto, setValsto] = useState<number[]>([50000])
    //search
    const [search, setSearch] = useState('')
    //dress
    const [dress, setDress] = useState<{ id: string, title: string, img: string, price: string, likes: string, slot_id: string }[]>([])
    const [slots, setSlots] = useState<{ id: string, title: string }[]>([])
    //checkboxes
    let [checks, setChecks] = useState<{ status: boolean, id: string } []>([])
    //pagination
    const [pages, setPages] = useState<number[]>([1, 1, 1])
    const perPage = 4
    const [lengths, setLengths] = useState<number[]>([])

    useEffect(() => {
        get_slots().then(
            val => {
                setSlots(val)
                setChecks(val.map((v: { id: string }) => {
                    return {status: true, id: v.id}
                }))
                // console.log(val)
                // console.log(checks)
            },
            err => {
                alert('Что-то пошло не так :)')
            }
        )
    }, [])


    useEffect(() => {
        get_dress().then(
            val => {
                let dr = val.filter((v: { price: number }) => {
                    return (v.price <= valsto[0]) && v.price >= valsfrom[0]
                })
                    .filter((v: { title: string }) => {
                        return (v.title.toLowerCase().trim().includes(search.toLowerCase().trim()))
                    })
                    .filter((v: { slot_id: string }) => {
                        for (let c of checks) {
                            if (c.id == v.slot_id) {
                                return c.status
                            }
                        }
                    })
                setDress(dr)
                get_slots().then(
                    slots => {
                        setLengths(slots.map((s: { id: string }) => {
                            return (
                                dr.filter((d: { slot_id: string }) => {
                                    return (d.slot_id === s.id)
                                }).length
                            )
                        }))
                        setPages([1,1,1])
                    }
                )
            },
            err => {
                alert('Что-то пошло не так :)')
            }
        )
    }, [valsto, valsfrom, search, checks])

    return (
        <Container fluid className="main">
            <Row className="filters">
                <Col className="filter-box" xs={12} sm={4} md={2}>
                    <Filters handleShow={handleShow} checks={checks} setChecks={setChecks} show={show}
                             handleClose={handleClose} slots={slots}/>
                </Col>
                <Col className="price-box" xs={12} sm={8} md={5}>
                    <PriceRange title={"Цена от"} values={valsfrom} setVals={setValsfrom}/>
                    <PriceRange title={"Цена до"} values={valsto} setVals={setValsto}/>
                </Col>
                <Col xs={12} sm={12} md={5}>
                    <div className="search-box">
                        <Form className="search">
                            <Form.Group>
                                <Form.Control type="text" value={search} placeholder="Поиск"
                                              onChange={e => setSearch(e.target.value)}/>
                            </Form.Group>
                        </Form>
                        <Image className="logo-empty" src={require('../media/images/logo-empty.png')}></Image>
                        <Image className="square" src={require('../media/images/square.png')}></Image>
                    </div>
                </Col>
            </Row>
            {slots.map((s: { id: string, title: string }, i) => {
                return (
                    <Fragment>
                        {checks[i].status &&
                            <Row style={{borderTop: '2px solid black', marginTop: '20px'}} className="dress-row">
                                <Row>
                                    <h2 className="title">{s.title}</h2>
                                </Row>
                                <DressRow dress={dress} page={pages[i]} perPage={perPage} slot_id={s.id}/>
                                <Row>
                                    <Col className="pagination">
                                        <MyPagination i={i} pages={pages} setPages={setPages} maxLen={lengths[i]}
                                                      perPage={perPage}/>
                                    </Col>
                                </Row>
                            </Row>}
                    </Fragment>
                )
            })}
        </Container>
    )
}