import React from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Button,
          Form,
          FormGroup,
          Label,
          Input,
        } from 'reactstrap';
// import {Link} from 'react-router-dom'
// import SignUp from './SignUp'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login : true,
      modal: false,
      email: '',
      password: '',
      username: '',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
}

handleSubmit = e =>{
    e.preventDefault()
    axios({
      method: 'POST',
      url: 'https://insta.nextacademy.com/api/v1/login',
      data: {
        username: this.state.username,
        password:this.state.password
      }
    })
    .then(response => {
        console.log(response)
        // localStorage.setItem('jwt',response.data.auth_token)
        alert('login successfully')
        localStorage.setItem('jwt', response.data.auth_token)
        localStorage.setItem('userId', response.data.user.id)
        localStorage.setItem('userProfileImage', response.data.user.profile_picture)
        localStorage.setItem('username', response.data.user.username)
        // close modal
        this.props.toggleModalLogin()
        // update navbar's isLoggedIn state
        this.props.toggleLoggedIn()
        
    })
    .catch(error => {
      console.error(error.response)
      alert('Ops! something went wrong, please try again') // so that we know what went wrong if the request failed
    })
  }

  logOut=()=> {
    this.setState({loggedIn: false}); 
}

  render() {
    const { username, password } = this.state;
    const enabled =
          username.length > 0 &&
          password.length > 0;
    return (
      <div>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Username</Label>
                <Input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange}/>
              </FormGroup>
                <Button color="primary" disabled={!enabled} >Login</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </Form >
                {/* <p>New member?</p>
                <Button color="warning" onClick={this.toggle}><SignUp/></Button> */}
      </div>
        // :
        // <div>
        //      <Link to="/"><NavLink>Logout</NavLink></Link>
        //      {/* <Link to="/"><button>Countinue as a guest?</button> </Link> */}
        // </div>
    ); 
  }
}

export default Login
// onClick={this.handleLogout}