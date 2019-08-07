import React from 'react'
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator';
import UploadPage from './UploadPage';
import Image from 'react-graceful-image';
// import LoginForm from './LoginForm';
// import Login from './Login';

class MyProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            userImages: [],
        }
    }

    componentDidMount() {
        this.showImg()
    }

    showImg = () =>{
        axios({
            method: 'GET',
            url: `https://insta.nextacademy.com/api/v1/images/me`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(result => {
                console.log(result.data)
                this.setState({
                    isLoading: false,
                    userImages: result.data
                })
            })
            .catch(error => {
                console.log('ERROR: ', error.result)
            })
    }

    render() {
        const { isLoading } = this.state
        return (
            <>
                {isLoading ? (
                    //link people to login/signup
                    // <h5 className="text-center mt-5">please login to view your profile</h5>
                    <div><LoadingIndicator /></div>
                ) : (
                        <div className="container bg-light col-12 ">
                            <div className="row userDescr d-flex justify-content-center col-6">
                                <div className="col-md-4 justify-content-center align-item-center text-center">
                                    <img className="userImg rounded-circle m-4 border-white" src={localStorage.getItem('userProfileImage')} alt="ProfileImage" />
                                    <h3 className="mt-1 username">{localStorage.getItem('username')}</h3>
                                </div>
                                <div className="col-md-9 justify-content-center align-item-center ">
                                    <div className="d-flex ml-4 mt-5 justify-content-center align-items-center">
                                        <UploadPage showImg={this.showImg}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="flex-wrap">
                                    {
                                        this.state.userImages.map((image, index) => {
                                            return (
                                                <Image src={image} key={`userImages${index}`} alt={"photos"} className="userImgs rounded" width="150px" retry={{ count: 10, delay: 2 }} />   /*retry loading images 10 times with 2 second delay between each try*/
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        )
    }
}
export default MyProfilePage