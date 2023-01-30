import React, {useEffect, useRef, useState} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Col, Image, Overlay, Pagination, Row, Tooltip} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {Range} from 'react-range';
import "./css/Dress.css"
import {useNavigate} from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";


let _ = require('lodash');

async function get_dress(id: string) {
    const response = await fetch(`/api/dress/${id}/`)
    const json = await response.json()
    return json
}

async function get_slots() {
    const response = await fetch('/api/slots/')
    const json = await response.json()
    return json
}

async function get_comments(dress_id: string) {
    const response = await fetch(`/api/review/${dress_id}/`)
    if (response.status == 200) {
        const json = await response.json()
        return json
    } else {
        throw new Error(response.statusText);
    }
}

async function set_comment(user_key: string, user_id: string, comment: string, dress_id: string, id: string = '', update: boolean = false) {
    let cookie = _.split(document.cookie, '=')[1]
    if (update == true) {
        const response = await fetch(`/api/review/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8',
                'X-CSRFToken': cookie
            },
            body: JSON.stringify({
                user_key: user_key,
                comment: comment,
            })
        })
        const json = await response.json()
        return json
    }
    else {
        const response = await fetch(`/api/review/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8',
                'X-CSRFToken': cookie
            },
            body: JSON.stringify({
                user_id: user_id,
                user_key: user_key,
                comment: comment,
                dress_id: dress_id
            })
        })
        const json = await response.json()
        return json
    }
}

async function get_user(key: string) {
    const response = await fetch(`/api/users/${key}/`)
    const json = await response.json()
    return json
}

async function get_user_by_id(id: string, comment: string, comment_id: string) {
    const response = await fetch(`/api/users_id/${id}/`)
    const json = await response.json()
    json['comment'] = comment
    json['comment_id'] = comment_id
    return json
}

async function delete_comment(id: string, user_key: string | null) {
    let cookie = _.split(document.cookie, '=')[1]
    const response = await fetch(`/api/review/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
            'X-CSRFToken': cookie
        },
        body: JSON.stringify({
            user_key: user_key,
        })
    })
}

function getSlotNameById(id: string, slots: { id: string, title: string }[]) {
    for (let s of slots) {
        if (s.id == id) {
            return s.title
        }
    }
    return "Нет"
}

function getReviewer(id: string, reviewer: { id: string }[]) {
    for (let rev of reviewer) {
        if (rev.id == id) {
            return rev
        }
    }
    return {id: ''}
}

export function Dress() {
    //id
    const id_arr = window.location.href.split('/')
    const id = id_arr[id_arr.length - 2]
    //go back
    const navigate = useNavigate();
    //dress
    const [dress, setDress] = useState<{ img: string, title: string, price: string, id: string, description: string, slot_id: string }>({
        img: '',
        title: '',
        price: '',
        id: '',
        description: '',
        slot_id: ''
    })
    //comment
    const [comment, setComment] = useState('')
    //slots
    const [slots, setSlots] = useState([])
    //user
    const [user, setUser] = useState<{ id: string }>({id: ''})
    //comments
    const [comments, setComments] = useState([])
    //key
    const key = localStorage.getItem('mim_key')
    //page
    const [page, setPage] = useState(1)
    //alert
    const [show, setShow] = useState(false);
    const target = useRef(null);
    //commentators
    const [reviewer, setReviewer] = useState<{ id: string, name: string, surname: string, comment: string }[]>([])
    //update comment
    const [updateMode, setUpdateMode] = useState(false)
    const [commentId, setCommentId] = useState('')


    useEffect(() => {
        if (key !== null) {
            get_user(key).then(
                val => {
                    setUser(val)
                }
            )
        }
    }, [])

    useEffect(() => {
        get_slots().then(
            val => {
                setSlots(val)
            },
            err => {
                alert("Что-то пошло не так :)")
            }
        )
    }, [])

    useEffect(() => {
        get_dress(id).then(
            val => {
                setDress(val)
                get_comments(val['id']).then(
                    val => {
                        // setComments(_.sortBy(val, (v: {user_id: string}) => {return v.user_id == user.id}))
                        Promise.all(val.map((v: { id: string, user_id: string, comment: string }) => {
                            return get_user_by_id(v.user_id, v.comment, v.id)
                        })).then(
                            val1 => {
                                setReviewer(val1)
                            }
                        )

                    }
                )
            },
            err => {
                alert("Что-то пошло не так :)")
            }
        )
    }, [])
    return (
        <div>
            <Button className="btn-primary" onClick={() => {
                navigate(-1)
            }}>
                Назад
            </Button>
            <Container className="mycard">
                <Row>
                    <Col>
                        <h3>{dress.title}<span className="slot">Слот: {getSlotNameById(dress.slot_id, slots)}</span>
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={6} md={4}>
                        <Image className="img" src={require(`../${_.join(_.slice(_.split(dress.img, '/'), 3), '/')}`)}/>
                    </Col>
                    <Col xs={6} sm={6} md={8}>
                        <Scrollbar>
                            <p>{dress.description}</p>
                        </Scrollbar>
                        <div className="buy">
                            <span className="price">{dress.price}р</span><Button>Купить</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className="comments">
                {_.slice(_.sortBy(reviewer, (v: { id: string }) => {
                    return (v.id !== user.id)
                }), (page - 1) * 5, page * 5).map((r: { id: string, comment: string, comment_id: string, name: string, surname: string }) => {
                    return (
                        <Container className="comment">
                            <Row>
                                <Col xs={6} sm={6}>
                                    {r.name} {r.surname}
                                </Col>
                                <Col xs={3} sm={3}>
                                    {r.id == user.id && <Image onClick={() => {
                                        setComment(r.comment)
                                        setUpdateMode(true)
                                        setCommentId(r.comment_id)
                                    }} className="update-comment"
                                                               src={require(`../media/images/update_comment.png`)}/>}
                                </Col>
                                <Col xs={3} sm={3}>
                                    {r.id == user.id && <Image onClick={() => {
                                        delete_comment(r.comment_id, key).then (
                                            val => {
                                                get_comments(dress.id)
                                                .then(
                                                    val => {
                                                        // setComments(_.sortBy(val, (v: {user_id: string}) => {return v.user_id == user.id}))
                                                        Promise.all(val.map((v: {id: string, user_id: string, comment: string }) => {
                                                            return get_user_by_id(v.user_id, v.comment, v.id)
                                                        })).then(
                                                            val1 => {
                                                                setReviewer(val1)
                                                            }
                                                        )
                                                    })
                                            }
                                        );
                                    }} className="delete-comment" src={require(`../media/images/delete_comment.png`)}/>}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {r.comment}
                                </Col>
                            </Row>
                        </Container>
                    )
                })}
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
                            {page < Math.ceil((reviewer.length) / 5) && <Pagination.Item onClick={() => {
                                setPage(page + 1)
                            }}>{page + 1}</Pagination.Item>}
                            {page < Math.ceil(reviewer.length / 5) && <Pagination.Next onClick={() => {
                                setPage(page + 1)
                            }}/>}
                            <Pagination.Last onClick={() => {
                                setPage(Math.ceil(reviewer.length / 5))
                            }}/>
                        </Pagination>
                    </Col>
                </Row>
                <Row>
                    <Col className="send-comment">
                        <Form className="d-flex" onSubmit={(e) => {
                            e.preventDefault()
                            const key = localStorage.getItem('mim_key')
                            if (key == null) {
                                alert('Авторизуйтесь, чтобы оставить комментарий')
                            } else {
                                set_comment(key, user.id, comment, dress.id, commentId, updateMode)
                                    .then(
                                        val => {
                                            get_comments(dress.id)
                                                .then(
                                                    val => {
                                                        // setComments(_.sortBy(val, (v: {user_id: string}) => {return v.user_id == user.id}))
                                                        Promise.all(val.map((v: { id: string, user_id: string, comment: string }) => {
                                                            return get_user_by_id(v.user_id, v.comment, v.id)
                                                        })).then(
                                                            val1 => {
                                                                setReviewer(val1)
                                                            }
                                                        )
                                                    })
                                            setComment('')
                                            setCommentId('')
                                            setUpdateMode(false)
                                        })
                                    .catch(
                                        (e) => {
                                            console.log(e)
                                            setShow(true)
                                            setTimeout(() => {
                                                setShow(false)
                                            }, 2000)
                                        }
                                    )
                            }
                        }}>
                            <Form.Control
                                type="text"
                                placeholder="Комментарий"
                                className="me-2"
                                value={comment}
                                onChange={(e) => {
                                    setComment(e.target.value);
                                }}
                            />
                            <Button type="submit" variant="outline-dark">Отправить</Button>
                        </Form>
                        <Button ref={target} style={{opacity: 100, backgroundColor: 'white', border: 'none'}}></Button>
                        <Overlay target={target.current} show={show} placement="right">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props}>
                                    Вы уже отправили отзыв
                                </Tooltip>
                            )}
                        </Overlay>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}