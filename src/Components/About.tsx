import "./css/About.css"
import "./css/Menu.css"
import React, {useEffect, useState, useRef} from "react";
import {ReactComponent} from "*.svg";
import gsap, {Power2} from "gsap"
import {Image} from "react-bootstrap";

export function About() {
    let intro = useRef(null)
    let texts = [
        "Проект, целью которого является создание одежды,\n" +
        "состоящей из сборных модулей",
        "Модульная одежда дает людям возможность стать дизайнером и собственноручно\n" +
        "формировать свой образ на каждый день.\n",
        "Разделение одежды на модули дает пространство для фантазий, открывает большое число различных\n" +
        "комбинаций, вдохновляет на новые идеи"
    ]
    let [page, setPage] = useState<number>(0)
    let [text, setText] = useState(texts[0])
    let [diraction, setDiraction] = useState(true)
    let [isLink, setIsLink] = useState(false)
    let [isActive, setIsActive] = useState(false)
    const firstUpdate = useRef(true);
    useEffect(
        () => {
            if (firstUpdate.current) {
                firstUpdate.current = false;
            } else {
                let tl1 = gsap.timeline()
                let tl2 = gsap.timeline()
                if (diraction) {
                    tl1.to(".info-content", {
                        height: 0,
                        padding: 0,
                        duration: 1,
                        delay: 1
                    })
                    tl2.to(".info-content-text", {
                        opacity: 0,
                        duration: 1,
                    })
                    tl1.set(".info-content", {
                        height: '100vh',
                        width: 0,
                        left: 0,
                        top: 0,
                    })
                    tl1.to(".info-content", {
                        width: '100%',
                        paddingLeft: '15%',
                        paddingRight: '15%',
                        paddingBottom: '80px',
                        duration: 1
                    })
                    tl2.to(".info-content-text", {
                        opacity: 1,
                        duration: 2,
                        delay: 2
                    })
                } else {
                    tl1.to(".info-content", {
                        height: 0,
                        padding: 0,
                        duration: 1,
                        delay: 1
                    })
                    tl2.to(".info-content-text", {
                        opacity: 0,
                        duration: 1,
                    })
                    tl1.set(".info-content", {
                        height: '100vh',
                        width: '100%',
                        marginLeft: '100%',
                        top: 0,
                    })
                    tl1.to(".info-content", {
                        marginLeft: '0%',
                        paddingLeft: '15%',
                        paddingRight: '15%',
                        paddingBottom: '80px',
                        duration: 1
                    })
                    tl2.to(".info-content-text", {
                        opacity: 1,
                        duration: 1,
                        delay: 2
                    })
                }
                setTimeout(() => {
                    if (page === texts.length) {
                        setText("Перейти в магазин")
                        setIsLink(true)
                    } else {
                        setText(texts[page])
                        setIsLink(false)
                    }
                }, 1000);
                setTimeout(() => {
                    setIsActive(true)
                }, 4000)
            }
        }
        , [page])

    useEffect(
        () => {
            let tl1 = gsap.timeline()
            let tl2 = gsap.timeline()
            tl1.to(".load-screen", {
                backgroundColor: 'white',
                duration: 0.5,
                ease: 'none'
            })
            tl1.to(".load-screen", {
                backgroundColor: 'rgba(247, 84, 52, 1)',
                duration: 1,
                ease: 'none',
            })
            tl1.to(".load-screen", {
                backgroundColor: 'black',
                duration: 0.5,
                ease: 'none',
            })
            tl2.to(".load-screen", {
                width: '100%',
                duration: 2,
                ease: Power2.easeInOut,
            })
            tl1.to(".load-screen", {
                backgroundColor: '#FFF5EE',
                duration: 2,
                ease: "none.none",
                delay: 0.5
            })
            tl2.to([".load-logo-empty", ".load-logo-square"], {
                opacity: 1,
                duration: 2,
                ease: "none.none",
                delay: 0.5
            })
            tl1.to(".load-title", {
                opacity: 1,
                duration: 3,
            })
            tl2.to(".load-logo-square", {
                marginLeft: '30%',
                duration: 3,
                ease: "bounce.out"
            })
            tl1.to(".load-logo-empty", {
                marginLeft: '35%',
                duration: 0.1,
                ease: 'none',
                delay: 0.5
            })
            tl2.to(".load-logo-square", {
                marginLeft: '55%',
                duration: 0.1,
                ease: 'none',
                delay: 0.5
            })
            tl1.to(".load-screen", {
                left: '100%',
                duration: 0.5,
                ease: 'none',
                delay: 0.5
            })
            tl2.to('.load-container', {
                opacity: 0,
                duration: 0.5,
                delay: 0.5
            })
            tl1.to(".info-content-text", {
                opacity: 1,
                duration: 3
            })
            setTimeout(() => {
                setIsActive(true)
            }, 12000)
        }, [])
    return (
        <>
            <div className="load-container">
                <div className="load-screen" ref={intro}>
                    <h2 className="load-title">Модуль и Модуль</h2>
                    <Image className="load-logo-empty" src={require('../media/images/logo-empty.png')}/>
                    <Image className="load-logo-square" src={require('../media/images/square.png')}/>
                </div>
            </div>
            <div className="info-container">
                <div className="info-slide">
                    {page > 0 && <span className="prev" onClick={(e) => {
                        if (isActive) {
                            setIsActive(false)
                            setDiraction(false)
                            setPage(page - 1)
                        }
                    }}> {"<"} </span>}
                    <div className="info-content">
                        <p className="info-content-text">
                            {isLink && <a href="/shop" className="info-shop">{text}</a>}
                            {!isLink && text}
                        </p>
                    </div>
                    {page < texts.length && <span className="next" onClick={(e) => {
                        if (isActive) {
                            setIsActive(false)
                            setDiraction(true)
                            setPage(page + 1)
                        }
                    }}> {">"} </span>}
                </div>
            </div>
        </>
    )
}