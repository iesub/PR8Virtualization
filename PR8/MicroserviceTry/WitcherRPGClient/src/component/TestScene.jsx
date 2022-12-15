import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import SceneConnector from "./GameObjectComponents/SceneConnector";
import $ from "jquery";
import { useEffect } from "react";
import Cookies from "universal-cookie";

const TestScene = (props) => {

    let client
    let cookie = new Cookies()

    const setStompClient = (stompClient) => {
        client = stompClient; 
    }

    const rollLifePath = () => {
        if(client) {
            client.send("/server/scene/" + cookie.get("sceneHash") + "/LifePathRollButton" + cookie.get("playerObjectName") + ".pushButton"
                ,{"Authorization": cookie.get("Bearer")},
                {})
        }
    }

    const setCharacterName = () => {
        if(client) {
            client.send("/server/scene/" + cookie.get("sceneHash") + "/NameInput" + cookie.get("playerObjectName") + ".inputData"
                ,{},
                JSON.stringify({"input": $("#characterNameInput").val()}))
        }
    }

    const saveUserGameObject = () => {
        $.ajax({
            url: cookie.get("serverUrl") + '/api/saveUserObject/scene/' + cookie.get("sceneHash") + "/" + cookie.get("playerObjectName"),         
            method: 'post',             
            dataType: 'html',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", cookie.get("Bearer"));
            },
            data: {},           
            success: function(data){
            }
          })
    }

    const updateScene = (payload) => {
        var data = JSON.parse(payload.body)
        for (const element of data.objects){
            if (element.name === cookie.get("playerObjectName")){
                $("#name").text(String(element.components[0].name))
                $("#region").text(String(element.components[0].region))
            }
        }
    }

    useEffect(() => {
        $("#characterNameInput").on("input", setCharacterName)
    })

    return(
        <>
        <SceneConnector sceneName = "TestScene" sceneUpdateFunc = {updateScene} setStompClient = {setStompClient}></SceneConnector>
        <Container>
            <Row>
                <Col xl="6">
                    <Form>
                        <Form.Group className="xl-3" controlId="formBasicEmail">
                            <Form.Label>Имя персонажа</Form.Label>
                            <Form.Control id = "characterNameInput" name = "input" placeholder="Введите имя персонажа" />
                        </Form.Group>
                    </Form>
                    <br></br>
                    <p id = "name">Текст</p>
                    <p id = "region">Текст</p>
                    <Button id = "RollLifePath_Button" onClick = {rollLifePath}>Рольнуть</Button>
                    <Button id = "SaveUser_Button" onClick = {saveUserGameObject}>Сохранить персонажа</Button>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default TestScene