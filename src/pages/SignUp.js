import React from 'react'
import axios from 'axios'
import {
  Button,
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      isValid: null,
    };
    this.timer = null
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  checkUsername = username => {
    axios.get(
      `https://insta.nextacademy.com/api/v1/users/check_name?username=${username}`
    ).then(result => {
      if (result.data.valid) {
        this.setState({
          isValid: true
        });
      } else {
        this.setState({
          isValid: false
        })
      }
    })
  }

  handleUsernameInput = e => {
    clearTimeout(this.timer)

    const { value } = e.target
    this.setState({
      username: value
    })
    this.timer = setTimeout(() => {
      this.checkUsername(value)
    }, 100)
  }

  getInputProp = () => {
    const { isValid, username } = this.state
    if (username.length > 4) {
      if (isValid) {
        return { valid: true }
      } else {
        return { invalid: true }
      }
    } else {
      return {}
    }
  }

  getPwdProp=()=>{
    const {password} = this.state
    if(password.length === 0 && password.length <8){
      return {}
    } else if(password.length >= 8){
      return {valid : true}
    }else{
      return{invalid :true}
    }
  }

  getEmailProp=()=>{
    const {email} = this.state
    let check = /^[a-zA-Z0-9\-_]+@[a-zA-Z0-9\-_]+\.[a-zA-Z]{2,3}$/;
    if (email.length < 8){
      return{}
    }
    else if(check.test(email)){
      return{valid : true}
    }else{
      return{invalid : true}
    }
  }
  // text,clearTimeout(), setTimeout()
  // handleUsernameInput=e=>{
  //   Axios.get(url=${e.target.value})
  //   .then(result =>{
  //     console.log(result.data.valid)
  //   })
  // }

  //handleChange=({target})=>{
  //   this.setState({
  //     [target.name]:target.value
  //   })
  // }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    // console.log(event.target.value)
  }

  handleSubmit = () => {
    axios({
      method: 'POST',
      url: 'https://insta.nextacademy.com/api/v1/users/',
      data: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(response => {
        alert('working')
        console.log(response)
      })
      .catch(error => {
        console.error(error.response) // so that we know what went wrong if the request failed
      })
  }


  render() {
    const { username, isValid, email, password, confirmPassword } = this.state;
    const enabled =
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword;
    const check = /^[a-zA-Z0-9\-_]+@[a-zA-Z0-9\-_]+\.[a-zA-Z]{2,3}$/;
    return (
      <div>
        <Form>
          <FormGroup>
            <Label>Username</Label>
            <Input {...this.getInputProp()}
              value={this.state.username}
              onChange={this.handleUsernameInput} type="text" name="username" id="username" placeholder="At least 6 characters" />
            <FormFeedback>
              {username.length >= 6
                ? isValid
                  ? "Sweet, this username is available!"
                  : "Sorry, this username is taken!"
                : "Must be minimum 6 characters"}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input {...this.getEmailProp()} type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
            <FormFeedback>
              {(check.test(email))? 'valid email' : 'invalid email'}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input {...this.getPwdProp()} type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
            <FormFeedback>
              {password.length >= 8? "Sweet, nice password!":"Password is too short"}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>ConfirmPassword</Label>
            <Input type="password" name="confirmPassword" id="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
          </FormGroup>
        </Form>
        <Button color="primary" onClick={this.handleSubmit} disabled={!enabled}>Sign Up</Button>{' '}
        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
      </div>
    );
  }
}

export default SignUp
// onClick={this.toggle}
// value={this.state.username} onChange={this.handleChange}