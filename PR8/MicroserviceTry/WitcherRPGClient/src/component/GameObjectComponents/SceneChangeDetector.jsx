import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import Cookies from "universal-cookie";

const SceneChangeDetector = () => {

    let cookie = new Cookies()
    const location = useLocation();

    const disconnectUser = () => {
        $.ajax({
            url: cookie.get("serverUrl") + '/api/disconnectUser/scene/' + cookie.get("sceneHash"),         
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

    const deletePlayerObject = () => {
        $.ajax({
            url: cookie.get("serverUrl") + '/api/deleteGameObject/scene/' + cookie.get("sceneHash") + "/" + cookie.get("playerObjectName"),         
            method: 'post',             
            dataType: 'html',
            async: false,
            beforeSend: function(request) {
              request.setRequestHeader("Authorization", cookie.get("Bearer"));
            },
            data: {},            
            success: function(data){
            }
          })
    }


    useEffect(() => {
        if (cookie.get("sceneHash") && cookie.get("pathname") !== location.pathname){
            deletePlayerObject()
            disconnectUser()
            cookie.remove("sceneHash")
            cookie.remove("serverUrl")
            cookie.remove("playerObjectName")
            cookie.remove("pathName")
        }
    }, [location])

    return (
        <label style={{display: "none"}}></label>
    )
}

export default SceneChangeDetector