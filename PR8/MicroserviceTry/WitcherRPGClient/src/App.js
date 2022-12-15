import $ from "jquery";
import './css/App.css';
import Header from "./component/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Registration from "./component/Registration"
import { connect } from "react-redux";
import TestScene from "./component/TestScene";
import SceneChangeDetector from "./component/GameObjectComponents/SceneChangeDetector";
import TestConnectionToLobby from "./component/TestConnectionToLobby";


const App = (props) => {
  
  var routes = []

  if (props.user.checked){
    routes.push(
      <>
        <Route key = {"route" + Math.random() * (100 - 1) + 1} path = '/login' element = {<Login/>}/>
        <Route key = {"route" + Math.random() * (100 - 1) + 1} path = '/registration' element = {<Registration/>}/>
        <Route key = {"route" + Math.random() * (100 - 1) + 1} path = '/testScene' element = {<TestScene></TestScene>}/>
        <Route key = {"route" + Math.random() * (100 - 1) + 1} path = '/' element = {<TestConnectionToLobby></TestConnectionToLobby>}/>
      </>
    )
  }
  
  return(
    <BrowserRouter>
    <SceneChangeDetector></SceneChangeDetector>
    <Header></Header>
      <Routes>
        {routes}
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps = (store) => {
  return {
      user: store.user
  }
}

export default connect(
  mapStateToProps
)(App);
