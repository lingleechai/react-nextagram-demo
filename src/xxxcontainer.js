import React from 'react'
import axios from 'axios'

export default class ImageContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
    }

    componentDidMount() {
        axios('https://insta.nextacademy.com/api/v1/images?userId=' + this.props.id)
            .then(result => {
                let images = result.data
                this.setState({images})
            })

    }

    render() {
        if (this.state.images.length === 0) return null
        return (
            <div style={{backgroundColor: "papayawhip"}}>
                {
                    this.state.images.map(image => {
                        return (
                            <img width={"150px"} src={image} alt="photos"></img>  
                        )
                    })
                }
            </div>
        )
    }

}