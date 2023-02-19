import React, {Fragment} from "react";
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./css/DressRow.css"


let _ = require('lodash');

export function DressRow(props: { dress: { id: string, title: string, img: string, price: string, likes: string, slot_id: string }[], page: number, perPage: number, slot_id: string }) {
    return (
        <Fragment>
            {_.slice(props.dress.filter((d: { id: string, title: string, img: string, price: string, likes: string, slot_id: string }) => {
                return (d.slot_id === props.slot_id)
            }), (props.page - 1) * props.perPage, props.page * props.perPage)
                .map((d: { id: string, title: string, img: string, price: string, likes: string, slot_id: string }) => {
                    return (
                        <Fragment>
                            <Col xxl={3} lg={3} md={3} sm={6} xs={6} xxs={6} className="dress-row">
                                <Card className="content" onClick={function () {
                                    window.location.href = `/dress/${d.id}`
                                }}>
                                    <Card.Img variant="top"
                                              src={require(`../${_.join(_.slice(_.split(d.img, '/'), 3), '/')}`)}/>
                                    <Card.Body>
                                        <Card.Title>{d.title}</Card.Title>
                                        <Card.Text>
                                            <p className="price-text">{d.price} руб</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Fragment>
                    )
                })}
        </Fragment>
    )
}
