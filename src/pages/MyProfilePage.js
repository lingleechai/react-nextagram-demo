import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

class MyProfilePage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            userImages: [],
        }
    }

    componentDidMount() {
        axios({
        method: 'GET',
        url:(`https://insta.nextacademy.com/api/v1/images/me`),
        headers : {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
        .then(result => {
            console.log(result)
          this.setState({
              isLoading: false,
              userImages: result.data
          })
        })
        .catch(error => {
            //             console.log('ERROR: ', error.result)
            //         })
    }

    // componentDidMount() {
    //     axios({
    //         method: 'GET',
    //         url: 'https://insta.nextacademy.com/api/v1/images/me',
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('jwtCode')}`
    //         }
    //     })
    //         .then(result => {
    //             console.log(result.data)
    //             this.setState({
    //                 isLoading: false,
    //                 myImgs: result.data
    //             })
    //         })
    //         .catch(error => {
    //             console.log('ERROR: ', error.result)
    //         })
    // }

render(){
    return(
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
export default MyProfilePage