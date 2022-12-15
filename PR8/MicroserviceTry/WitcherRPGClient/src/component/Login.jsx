import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import $ from "jquery";
import { initUser } from "../actions/AuthorizationActions"
import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = (props) => {

    const [show, setShow] = useState(false);
    let navigate = useNavigate();

    $("#headlineRow").css({
        "border-bottom": "solid grey 2px",
        "margin-bottom": "20px"
    })

    return(
        <Container>
            <Row id = "headlineRow">
                <h1>Авторизация</h1>
            </Row>
            <Row>
                <Col xs = "3"></Col>
                <Col xs = "6">
                <Form id = "loginForm" onSubmit={(e) => {
                    e.preventDefault()
                    let data = new FormData(e.target);
                    let value = Object.fromEntries(data.entries())
                    $.ajax({
                        url: process.env.REACT_APP_SERVER_NAME + '/auth-service/login',         
                        method: 'post',             
                        data: JSON.stringify(value),
                        contentType: "application/json",            
                        success: function(data, status, xhr){
                            if (data.authenticated == true){
                                props.setInitAction({
                                    checked: true,
                                    isAuthenticated: data.authenticated
                                })
                                let cookie = new Cookies()
                                let date = new Date(Date.now())
                                date.setTime(date.getTime() + (xhr.getResponseHeader('Expiration')*1000))
                                cookie.set("Bearer", data.token, {path: '/', expires: date})
                                navigate("/", { replace: true });
                            } else {
                                setShow(true)
                            }
                        }
                      })
                }}>
                    <Form.Group>
                    <Alert id = "alert" show={show} variant="danger">
                            <p>
                            Неверный логин или пароль.
                            </p>
                    </Alert>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Ваш адрес электронной почты</Form.Label>
                        <Form.Control type="email" name = "mail" placeholder="example@mail.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password"name = "password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Зайти
                    </Button>
                </Form>
                </Col>
                <Col xs = "3"></Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        setInitAction: payload => dispatch(initUser(payload))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)