import React from "react"
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator'
import ImageContainer from '../ImageContainer'

const profileimg ={
    marginLeft: '10px',
    borderRadius:'50%',
    border: 'solid 3px #c1d1d7',
    boxShadow : '2px 2px 1px 0px #52312b',
    padding: '5px',
}

class UserProfilePage extends React.Component {
    state={
        users : null
    }

    componentDidMount() {
        const {id} = this.props.match.params
        console.log(`https://insta.nextacademy.com/api/v1/users/${id}`)
        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
        .then(result => {
          const users = result.data
          this.setState({users})
        })
    }

  render() {
      if(!this.state.users) return <LoadingIndicator/>

      const {id,username,profileImage} = this.state.users
    return (
    <div>
        <div className="userprofileContainer col-md-12">
            <div className="myrow row">

                <div className="profileInfo col">
                    <img className='profileimg' src={profileImage} width="200px" style={profileimg} alt="profile img"/>
                    <div className="recBox">
                        <h5 className='profileName'>{username}</h5>  
                    </div>
                </div>
                <ImageContainer id={id}/>

            </div>
        </div>

    </div>

    )
  }
}

export default UserProfilePage