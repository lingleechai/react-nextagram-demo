
import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../logo.png';
// import Login from '../pages/LoginForm'
// import SignUp from '../pages/SignUp'
import LoginForm from '../pages/LoginForm'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Input,
} from 'reactstrap'

const logoFont={
    fontFamily: 'Trebuchet MS',
    fontSize : '30px',
    fontWeight : 'bolder',
    color: 'white',
}

const titleNav={
    fontSize:'20px'
}

export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      isLoggedIn: false
    }
  }

  refreshNavbar = () => {
    this.forceUpdate()
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleLoggedIn = ()=> {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  }

  handleLogout = () => {
    this.toggleLoggedIn();
    this.toggle();
    localStorage.removeItem('jwt')
    localStorage.removeItem('userId')
    localStorage.removeItem('userProfileImage')
    localStorage.removeItem('userUsername')
    alert('you have been logged out')
  }

  // toggleLoggedIn= ()=> {
  //   this.setState({
  //     isLoggedIn: !this.state.isLoggedIn
  //   })
  // }
  

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
        <Link to={`/`} style={logoFont}>
            <img
              className="mr-2"
              src={logo}
              alt="logo"
              height="50"
            />
            Nextagram
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <Form inline >
                <FormGroup style={titleNav} className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="email" name="email" id="exampleEmail" placeholder="username" />
                </FormGroup>
                <Button id="onsubmit">Search</Button>
            </Form>

              <NavItem style={titleNav}>
                <NavLink href="/profile/">User</NavLink>
              </NavItem>
              
              <NavItem style={titleNav}>
                {this.state.isLoggedIn ?
                <NavLink to ='/' tag={Link} onClick={this.handleLogout}>Logout</NavLink>
                :
                <LoginForm toggleLoggedIn = {this.toggleLoggedIn}/>
                }
                </NavItem>
              {/* </NavItem>
              <NavItem style={titleNav}>
                {/* <Link tag={Link} to={`/Login`}> */}
                {/* {this.state.isLoggedIn ? "Logged Out" : <LoginForm/>} */}
                {/* </Link> */}
              {/* </NavItem > */}

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
              // <NavItem style={titleNav}>
              //   {/* <NavLink href="#"> */}
              //    <SignUp/>
              //   {/* </NavLink> */}
              // </NavItem >