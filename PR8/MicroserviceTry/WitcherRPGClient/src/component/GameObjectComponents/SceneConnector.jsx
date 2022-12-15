import SockJS from "sockjs-client";
import $ from "jquery";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";


const SceneConnector = (props) => {

    let stompClient;
    let Stomp = require('stompjs');
    let cookie = new Cookies()
    let sceneCreated = false
    const location = useLocation();

    const onConnected = () => {
        subscribeOnEvents()
        props.setStompClient(stompClient)

        setInterval(function(){
            stompClient.send("/server/scene/" + cookie.get("sceneHash") + ".heartBeat"
                ,{},
                {})
        }, 10 * 1000)
    }

    const onError = () => {
        alert("Websocket error")
    }

    const createScene = () => {
        $.ajax({
            url: process.env.REACT_APP_SERVER_NAME + '/engine-controller/api/closed/scene/create',         
            method: 'post',
            contentType: "application/json",            
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", cookie.get("Bearer"));
            },   
            async: false,
            data: '{"sceneName": "'+ props.sceneName +'"}',             
            success: function(data){
                if(!data.result && data.sceneHash == null){
                    return
                } else{
                    cookie.set("sceneHash", data.sceneHash)
                    cookie.set("playerObjectName", data.userObjectName)
                    cookie.set("serverUrl", data.serverUrl)

                    createWsConnection()
                }
            }
          })
    }

    const deleteScene = () => {
        $.ajax({
            url: cookie.get("serverUrl") + '/api/delete/scene/' + cookie.get("sceneHash"),         
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

    const onButtonClick = () => {
    }

    const subscribeOnEvents = () => {
        stompClient.subscribe('/user/client/scene/' + cookie.get("sceneHash") + '/buttonClickResult', onButtonClick);
        stompClient.subscribe('/client/scene/' + cookie.get("sceneHash") + '/sceneUpdate', props.sceneUpdateFunc);
    }

    const createWsConnection = () => {
        cookie.set("pathname", location.pathname)
        let socket = new SockJS(cookie.get("serverUrl") + '/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({"Authorization": cookie.get("Bearer")}, onConnected, onError);
    }

    useEffect(() => {
        if (cookie.get("sceneHash") != null){
            sceneCreated = true
        }
        if (!sceneCreated){
            createScene()
        }
        if(sceneCreated){
            createWsConnection()
        }
    })

    return(
        <label></label>
    )
}

export default SceneConnector