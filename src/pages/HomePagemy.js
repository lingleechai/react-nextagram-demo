import React from 'react';
import axios from 'axios';
import '../App.css';
import ImageContainer from '../ImageContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import {Link} from 'react-router-dom'



const profileimg ={
    marginLeft: '10px',
    borderRadius:'50%',
    border: 'solid 3px #c1d1d7',
    boxShadow : '2px 2px 1px 0px #52312b',
    padding: '5px',
}

class HomePagemy extends React.Component {
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
    
    return (
      <div>
        {isLoading ? (
        <LoadingIndicator/>
        ) : (
          <div>
          <div id="container">{
              users.map(user => {
                return(
                  <div className='userpreview col-md-12'key={user.id}>
                      <div className='profileimgcontainer col-md-4 col-sm-2 justify-content-center align-right'>
                        <Link to={`/user/${user.id}`}>
                          <h4 id='username'>{user.username}</h4>
                        </Link>
                          <img className='profileimg' width ="200px" src ={user.profileImage} style={profileimg} alt="profilePicture"/>
                          <Link to={`/user/${user.id}`}>
                          <button className='btnSeeMore'>See Profile</button>
                          </Link>
                      </div >
                      <div className='imgbox col-md-8 col-sm-10'>
                        <ImageContainer className="justify-content-center" id={user.id}/>
                      </div>
                  </div>
                  )
                })
              }
              </div>
            
          </div>
          )
        }
     </div>
        )
  }
}

export default HomePagemy;