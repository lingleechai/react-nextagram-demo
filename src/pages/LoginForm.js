import React from 'react'
import { Button,
          Modal,
          ModalHeader,
          ModalBody,
          ModalFooter,
          // Form,
          // FormGroup,
          // Label,
          // Input,
        } from 'reactstrap';
// import {Link} from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login : true,
      modal: false,
      isLoggedIn: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleModal = () => {
    this.setState({
      modal: false
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState(prevState => ({
        login: !prevState.login
    }));
}

// toggleLoggedIn = ()=> {
//   this.setState({
//     isLoggedIn: !this.state.isLoggedIn
//   })
// }


  render() {

    return (
      <>
        <button href="#" onClick={this.toggle} className="nav-link border-0 bg-transparent"> Login | SignUp</button>
        {/* <Button color="danger" onClick={this.toggle}>Login</Button> */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.state.login? 'Log In': 'Sign Up'}</ModalHeader>
          <ModalBody>
            {this.state.login ? <Login isLoggedIn = {this.state.isLoggedIn} toggleLoggedIn={this.props.toggleLoggedIn} toggleModalLogin={this.toggleModal}/>: <SignUp toggleModalSignUp= {this.toggleModal}/>}
          </ModalBody>
          <form onSubmit={this.handleSubmit}>
          <ModalFooter>
                <p>{this.state.login? 'New member?': 'Already have account?'}</p>
                <Button toggle={this.toggleLogin} color="warning"> {this.state.login? 'Sign Up': 'Log In'}</Button>
                {/* <Button color="warning" onClick={this.toggle}><SignUp/></Button> */}
          </ModalFooter>
          </form>
        </Modal>
      </>
    );
  }
}

// {this.state.isLoggedIn ? "Logged Out" : <LoginForm/>}

export default LoginForm
