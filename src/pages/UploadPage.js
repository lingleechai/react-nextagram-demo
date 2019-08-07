import React from 'react';
import axios from 'axios';
import {
    Button,
    Form,
    FormGroup,
    FormText,
    Input,
} from 'reactstrap';

class UploadPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageFile: null,
            message: '',
            previewImage: null,
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        let formData = new FormData()
        console.log(formData)
        formData.append('image', this.state.imageFile)
        axios.post(`https://insta.nextacademy.com/api/v1/images/`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(result => {
            debugger
            console.log(result)
            if (result.data.success) {
                this.setState({
                    message: "Image uploaded successfully!",
                    previewImage: null,
                    imageFile: null
                    })
                    this.props.showImg()
                }
            })
            .catch(error => {
                console.log(error.result);
            })
    }

    handleFile = e => {
        // debugger
        this.setState({
            previewImage: URL.createObjectURL(e.target.files[0]),
            imageFile: e.target.files[0]
        });
    };

    render() {
        const { previewImage, message } = this.state;
        return (
            // Your code will go here
            // <div>
            //     <input type="file" onClick={this.handleClick}></input>
            //     <button onChange={this.handleChange}>Upload Now!</button>
            // </div>
            <Form className="formContainer row" onSubmit={this.handleChange
                // The function to call on submit goes here
            }>
                <FormGroup className="justify-content-center">
                    <Input
                        type="file"
                        name="image-file"
                        onChange={
                            this.handleFile
                            // The function to call when you have selected a file will be called here
                        }
                    />
                    <FormText color="muted">
                        Make sure the image being uploaded is a supported format.
              </FormText>
                </FormGroup>
                <Button className=" m-3 justify-content-center" type="submit" color="primary">
                    Upload
            </Button>
                <div className="card">
                    {previewImage ? (
                        <img
                            src={previewImage}
                            // style={{width:'300px'}}
                            // style={styles.centerBox}
                            width="100%"
                            height="100%"
                            alt="Preview"
                        />
                    ) : (
                            <h3 className="text-center">
                                {message ? message : "Live Preview"}
                            </h3>
                        )}
                </div>
            </Form>
        )
    }
}

export default UploadPage;
