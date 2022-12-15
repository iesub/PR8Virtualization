import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import SceneConnector from "./GameObjectComponents/SceneConnector";
import $ from "jquery";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const TestConnectionToLobby = (props) => {

    const [lobbiesUpdated, setLobbiesUpdated] = useState(false)
    const [lobbies, setLobbies] = useState([])
    let cookie = new Cookies()
    let temp_lobbies = []

    const connectUser = (sceneHash) => {
        $.ajax({
            url: cookie.get("serverUrl") + '/api/connectUser/scene/' + sceneHash,         
            method: 'post',             
            dataType: 'html',
            async: false,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", cookie.get("Bearer"));
            },   
            data: {},    
            success: function(data){
                var data = JSON.parse(data)
                if (data.response === "ERROR_LOBBY_IS_FULL"){

                } else {
                    cookie.set("sceneHash", sceneHash)
                    cookie.set("playerObjectName", data.playerObjectName)
                    window.location.href = "/TestScene"
                }
            }
          })
    }

    const getListOfLobbies = () => {
        if (lobbiesUpdated) return;
        $.ajax({
            url: cookie.get("serverUrl") + '/api/getList/scene/' + "TestScene",         
            method: 'get',             
            dataType: 'html',
            async: false,
            data: {},
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", cookie.get("Bearer"));
            },             
            success: function(data){
                var data = JSON.parse(data)
                for (var key in data.sceneMap){
                    temp_lobbies.push(
                        <Row>
                            <Col>
                                <p> {key} </p>
                                <Button onClick={(e) => {
                                    connectUser(key)
                                }}> Зайти </Button>
                            </Col>
                        </Row>
                    )
                }
                setLobbies(temp_lobbies)
                setLobbiesUpdated(true)
            }
          })
    }

    getListOfLobbies()

    useEffect(() => {
    
    })

    return(
        <>
        <Container id = "lobbieListContainer">
            {lobbies}
        </Container>
        </>
    )
}

export default TestConnectionToLobby