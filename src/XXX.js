import React from 'react';
import axios from 'axios';
import './App.css';
import ImageContainer from './ImageContainer'


class App extends React.Component {
  state = {
    users: [],
    isLoading: true
  }

  componentDidMount() {
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(result => {
      const users = result.data
      this.setState({users, isLoading: false})
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
  }


  render(){
    const { users, isLoading } = this.state
    if (isLoading) {
      return <img src='https://www.google.com/search?q=icon&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiWyOzYkNzjAhV9IbcAHbeTBFMQ_AUIESgB&biw=1424&bih=681#imgrc=VtEXXQR0Jgpi8M:' alt="loadingindicator"/>
    }


    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div id="nextagram"> Nextagram </div> 
          <form id ="form" className="form-inline my-2 my-lg-0">
              <input id="email" type="text" placeholder="username" name="enter your email here*"/>
              <input id="button" type="submit" value="Search"></input>
          </form>
          <div id = "user">User</div>
          <div id ="signIn">Sign In</div>
          <div id ="signUp">Sign Up</div>
        </nav>

        <div id="container">
          <div>
          {
            this.state.users.map(user => {
              return(
                <div key={user.id}>
                  <h4>{user.username}</h4>
                  <img width ="200px" src ={user.profileImage} style={{borderRadius:'50%', border:'solid 3px brown'}} alt="profilePicture"/>
                  <div id="imgContainer" className="col-3 col-sm-4 d-flex">
                    <ImageContainer id={user.id}/>
                  </div>
                </div>
                )
              })
              }
          </div>
        </div>
      </div>
    )
  }
}
export default App;
