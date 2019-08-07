import React from 'react'
import Navbar from './components/NavBar'
import HomePagemy from './pages/HomePagemy'
import { Route } from 'react-router-dom'
import UserProfilePage from './pages/UserProfilePage'
import MyProfilePage from './pages/MyProfilePage';
// import Login from './pages/Login'
// import SignUp from './pages/SignUp';


class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route path="/user/:id" component={UserProfilePage}/>
        <Route exact path="/" component={HomePagemy} />
        <Route path ="/myprofile" component={MyProfilePage}/>
      </div>
    )
  }
}
export default App;
