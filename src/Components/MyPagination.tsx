import {Pagination} from "react-bootstrap";
import React from "react";


export function MyPagination(props: { pages: number[], setPages: (x: number[]) => void, maxLen: number, perPage: number, i: number }) {
    return (
        <Pagination>
            <Pagination.First onClick={() => {
                let pgs = [...props.pages]
                pgs[props.i] = 1
                props.setPages(pgs)
            }}/>
            {/*{props.page > 1 && <Pagination.Prev onClick={() => {*/}
            {/*    props.setPage(props.page - 1)*/}
            {/*}}/>}*/}
            {props.pages[props.i] > 1 && <Pagination.Item onClick={() => {
                let pgs = [...props.pages]
                pgs[props.i] -= 1
                props.setPages(pgs)
            }}>{props.pages[props.i] - 1}</Pagination.Item>}

            <Pagination.Item active>{props.pages[props.i]}</Pagination.Item>
            {props.pages[props.i] < Math.ceil((props.maxLen) / props.perPage) && <Pagination.Item onClick={() => {
                let pgs = [...props.pages]
                pgs[props.i] += 1
                props.setPages(pgs)
            }}>{props.pages[props.i] + 1}</Pagination.Item>}
            {/*{props.page < Math.ceil(props.maxLen / props.perPage) && <Pagination.Next onClick={() => {*/}
            {/*    props.setPage(props.page + 1)*/}
            {/*}}/>}*/}
            <Pagination.Last onClick={() => {
                let pgs = [...props.pages]
                pgs[props.i] = Math.ceil(props.maxLen / props.perPage)
                props.setPages(pgs)
            }}/>
        </Pagination>
    )
}