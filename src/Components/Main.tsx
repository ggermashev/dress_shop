import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Col, Image, Pagination, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {Range} from 'react-range';
import "./css/Main.css"
import "./css/Logo.css"

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
    const [dress, setDress] = useState([])
    const [slots, setSlots] = useState([])
    //checkboxes
    let [checks, setChecks] = useState<{ status: boolean, id: string } []>([])
    //pagination
    const [page, setPage] = useState(1)

    useEffect(() => {
        get_slots().then(
            val => {
                setSlots(val)
                setChecks(val.map((v: { id: string }) => {
                    return {status: true, id: v.id}
                }))
                console.log(val)
                console.log(checks)
            },
            err => {
                alert('Что-то пошло не так :)')
            }
        )
    }, [])


    useEffect(() => {
        get_dress().then(
            val => {
                setDress(val.filter((v: { price: number }) => {
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
                    <Button className="filter-btn" variant="primary" onClick={handleShow}>
                        Фильтры
                    </Button>
                    <Offcanvas className="filter-canvas" backdrop={false} scroll={true} show={show}
                               onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="filters-body">
                            <h3 className="title">Слоты</h3>
                            <Form>
                                <div key={`default-checkbox`} className="mb-3">
                                    {slots.map((s: { id: string, title: string }, ind) => {
                                        return (
                                            <Form.Check
                                                type='checkbox'
                                                id={`${ind}`}
                                                label={`${s.title}`}
                                                onChange={(e) => {
                                                    checks[ind].status = !checks[ind].status;
                                                    checks[ind].id = s.id
                                                    let copy = Array.from(checks)
                                                    setChecks(copy);
                                                }}
                                                defaultChecked={checks[ind].status}
                                            />
                                        )
                                    })}
                                </div>
                            </Form>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Col>
                <Col className="price-box" xs={12} sm={8} md={5}>
                    <div className="price">Цена от: {valsfrom}</div>
                    <Range
                        step={500}
                        min={0}
                        max={50000}
                        values={valsfrom}
                        onChange={(values) => setValsfrom(values)}
                        renderTrack={({props, children}) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '6px',
                                    width: '100%',
                                    backgroundColor: '#F75434',
                                    maxWidth: '350px'
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({props}) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '20px',
                                    width: '10px',
                                    backgroundColor: 'black'
                                }}
                            />
                        )}
                    />
                    <div className="price">Цена до: {valsto}</div>
                    <Range
                        step={500}
                        min={0}
                        max={50000}
                        values={valsto}
                        onChange={(values) => setValsto(values)}
                        renderTrack={({props, children}) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '6px',
                                    width: '100%',
                                    backgroundColor: '#F75434',
                                    maxWidth: '350px'
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({props}) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '20px',
                                    width: '10px',
                                    backgroundColor: 'black'
                                }}
                            />
                        )}
                    />
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
            <Row>
                {_.slice(dress, (page - 1) * 12, page * 12).map((d: { id: string, title: string, img: string, price: string, likes: string, slot_id: string }) => {
                    return (
                        <Col xxl={3} lg={3} md={4} sm={6} sx={12}>
                            <Card style={{width: '14rem'}} className="content" onClick={function() {window.location.href=`/dress/${d.id}`}}>
                                <Card.Img variant="top"
                                          src={require(`../${_.join(_.slice(_.split(d.img, '/'), 3), '/')}`)}/>
                                <Card.Body>
                                    <Card.Title>{d.title}</Card.Title>
                                    <Card.Text>
                                        <p className="price-text">{d.price} руб</p>
                                    </Card.Text>
                                    {/*<Button className="detailed" variant="primary"*/}
                                    {/*        href={`/dress/${d.id}`}>Подробнее</Button>*/}
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <Row>
                <Col className="pagination">
                    <Pagination>
                        <Pagination.First onClick={() => {
                            setPage(1)
                        }}/>
                        {page > 1 && <Pagination.Prev onClick={() => {
                            setPage(page - 1)
                        }}/>}
                        {page > 1 && <Pagination.Item onClick={() => {
                            setPage(page - 1)
                        }}>{page - 1}</Pagination.Item>}
                        <Pagination.Item active>{page}</Pagination.Item>
                        {page < Math.ceil((dress.length) / 12) && <Pagination.Item onClick={() => {
                            setPage(page + 1)
                        }}>{page + 1}</Pagination.Item>}
                        {page < Math.ceil(dress.length / 12) && <Pagination.Next onClick={() => {
                            setPage(page + 1)
                        }}/>}
                        <Pagination.Last onClick={() => {
                            setPage(Math.ceil(dress.length / 12))
                        }}/>
                    </Pagination>
                </Col>
            </Row>
        </Container>
    )
}