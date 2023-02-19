import React, {Fragment} from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";


export function Filters(props: { handleShow: () => void, show: boolean, handleClose: () => void, slots: { id: string, title: string }[], checks: { status: boolean, id: string }[], setChecks: ([]) => void }) {
    return (
        <Fragment>
            <Button className="filter-btn" variant="primary" onClick={props.handleShow}>
                Фильтры
            </Button>
            <Offcanvas className="filter-canvas" backdrop={false} scroll={true} show={props.show}
                       onHide={props.handleClose}>
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body className="filters-body">
                    <h3 className="title">Слоты</h3>
                    <Form>
                        <div key={`default-checkbox`} className="mb-3">
                            {props.slots.map((s: { id: string, title: string }, ind) => {
                                return (
                                    <Form.Check
                                        type='checkbox'
                                        id={`${ind}`}
                                        label={`${s.title}`}
                                        onChange={(e) => {
                                            props.checks[ind].status = !props.checks[ind].status;
                                            props.checks[ind].id = s.id
                                            let copy = Array.from(props.checks)
                                            props.setChecks(copy);
                                        }}
                                        defaultChecked={props.checks[ind].status}
                                    />
                                )
                            })}
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </Fragment>
    )
}