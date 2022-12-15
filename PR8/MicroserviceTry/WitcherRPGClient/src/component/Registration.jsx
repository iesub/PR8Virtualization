import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import $ from "jquery";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = (props) => {

    const [showFormatAlert, setShowFormatAlert] = useState(false);
    const [showExistanceAlert, setShowExistanceAlert] = useState(false);
    const [showPasswordAlert, setShowPasswordAlert] = useState(false);

    const [showMailEmptyAlert, setShowMailEmptyAlert] = useState(false);
    const [showNicknameEmptyAlert, setShowNicknameEmptyAlert] = useState(false);
    const [showPasswordEmptyAlert, setShowPasswordEmptyAlert] = useState(false);
    const [showPasswordConfEmptyAlert, setShowPasswordConfEmptyAlert] = useState(false);

    let navigate = useNavigate();

    $("#headlineRow").css({
        "border-bottom": "solid grey 2px",
        "margin-bottom": "20px"
    })

    return(
        <Container>
            <Row id = "headlineRow">
                <h1>Региcтрация</h1>
            </Row>
            <Row>
                <Col xs = "3"></Col>
                <Col xs = "6">
                <Form id = "regForm" onSubmit={(e) => {
                    e.preventDefault()
                    setShowExistanceAlert(false)
                    setShowFormatAlert(false)
                    setShowPasswordAlert(false)
                    let data = new FormData(e.target);
                    let value = Object.fromEntries(data.entries())
                    $.ajax({
                        url: process.env.REACT_APP_SERVER_NAME + '/auth-service/registration',         
                        method: 'post',             
                        contentType: "application/json",  
                        data: JSON.stringify(value),         
                        success: function(data){   
                            if (!data.mailExist && !data.gotErrors){
                                navigate("/login", { replace: true });
                            }
                        }, 
                        error: function(xhr, status, error){
                            data = JSON.parse(xhr.responseText)
                            if (!data.passwordsCorrect){
                                setShowPasswordAlert(true)
                            }
                            if (!data.mailCorrect){
                                setShowFormatAlert(true)
                            }
                            if (data.mailExist && data.gotErrors){
                                setShowExistanceAlert(true)
                            }
                            if (data.mailEmpty){
                                setShowMailEmptyAlert(true)
                            }
                            if (data.nicknameEmpty){
                                setShowNicknameEmptyAlert(true)
                            }
                            if (data.passwordEmpty){
                                setShowPasswordEmptyAlert(true)
                            }
                        }
                      })
                }}>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Alert id = "alert" show={showFormatAlert} variant="danger">
                            <p>
                                Неверный формат почты.
                            </p>
                        </Alert>
                        <Alert id = "alert" show={showExistanceAlert} variant="danger">
                            <p>
                                Пользователь с такой почтой уже существует.                            
                            </p>
                        </Alert>
                        <Alert id = "alert" show={showMailEmptyAlert} variant="danger">
                            <p>
                                Заполните это поле.                            
                            </p>
                        </Alert>
                        <Form.Label>Ваш адрес электронной почты</Form.Label>
                        <Form.Control type="email"name = "mail" placeholder="example@mail.com" />
                    </Form.Group>

                    <Alert id = "alert" show={showNicknameEmptyAlert} variant="danger">
                            <p>
                                Заполните это поле.                            
                            </p>
                    </Alert>
                    <Form.Group className="mb-3" controlId="formBasicNickname">
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control type="username" name = "username" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Alert id = "alert" show={showPasswordAlert} variant="danger">
                            <p>
                            Пароли должны совпадать.
                            </p>
                        </Alert>
                        <Alert id = "alert" show={showPasswordEmptyAlert} variant="danger">
                            <p>
                                Заполните это поле.                            
                            </p>
                        </Alert>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password"name = "password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Повторите пароль</Form.Label>
                        <Alert id = "alert" show={showPasswordConfEmptyAlert} variant="danger">
                            <p>
                                Заполните это поле.                            
                            </p>
                        </Alert>
                        <Form.Control type="password"name = "passwordConfirm" />
                    </Form.Group>
                
                    <Button variant="primary" type="submit">
                        Зарегистрироваться
                    </Button>
                </Form>
                </Col>
                <Col xs = "3"></Col>
            </Row>
        </Container>
    )
}

export default Registration;