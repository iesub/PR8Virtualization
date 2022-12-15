import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import '../css/Header.css'
import $ from "jquery";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initUser } from "../actions/AuthorizationActions";
import { useEffect } from 'react';
import Cookies from "universal-cookie";


const Header = (props) =>{

let navigate = useNavigate();
let loginPath
let regPath
let logoutComponent

useEffect(() => {
    if(!props.user.isAuthenticated && props.user.checked){
        if(!checkIfPathContains(pathname, authorizedAccessPaths)){
            replaceToLogin()
        }
    }
})

const logout = () => {
    let cookie = new Cookies()
    $.ajax({
        url: process.env.REACT_APP_SERVER_NAME + `/auth-service/logout`,         
        method: 'get',             
        dataType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", cookie.get("Bearer"));
        },    
        success: function(data){   
            cookie.remove("Bearer")
            window.location.reload("/");
        }
      });
      cookie.remove("Bearer")
      window.location.reload("/");
    }


const ifAuthenticated = () => {
    let cookie = new Cookies()
    if(cookie.get("Bearer") != null){
        props.setInitAction({
            checked: true,
            isAuthenticated: true
        }) 
    } else {
        props.setInitAction({
            checked: true,
            isAuthenticated: false
        }) 
    }
}

if (!props.user.checked){
    ifAuthenticated()
}

const checkIfPathContains = (line, paths) => {
    for (const element of paths){
        if (line.includes(element) || line == '/'){
            return true
        }
    }
    return  false
}

let pathname = window.location.pathname
let authorizedAccessPaths = ["/login", "/registration"]

const replaceToLogin = () =>{
    navigate("/login", { replace: true });
}


if (!props.user.isAuthenticated){
    loginPath = <LinkContainer  to = "/login">
                    <Nav.Link className = "NavLink">Авторизоваться</Nav.Link>
                </LinkContainer>
    regPath = <LinkContainer  to = "/registration">
                    <Nav.Link className = "NavLink">Зарегистрироваться</Nav.Link>
              </LinkContainer>
}

if (props.user.isAuthenticated){
    logoutComponent = <Nav.Link onClick = {logout} className = "NavLink">Выйти</Nav.Link>
}

return(
    <header>
        <Navbar className="Header" bg="primary" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand className = "Brand" href="/">
                Книжная полка
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <LinkContainer to = "/">
                <Nav.Link className = "NavLink">На главную</Nav.Link>
            </LinkContainer>
            {loginPath}
            {regPath}
            {logoutComponent}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
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
)(Header)