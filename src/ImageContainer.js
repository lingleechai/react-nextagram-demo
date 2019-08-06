import React from 'react'
import axios from 'axios'

const imgStyle ={
    margin:'20px',
    object: 'cover',
    border: 'solid 2px #c1d1d7',
    boxShadow : '1px 1px 1px 1px #52312b',

}
const boxSize ={
    padding :'0px',
    // border :'solid 2px grey',
}

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
            <div className="haha row col-lg-12 col-md-6 col-sm-4 justify-content-center" style={boxSize}>
                {
                    this.state.images.map((image,index) => {
                        return (
                            <div key={`${this.props.id}+${index}`} className="d-flex justify-content-center align-item-center">
                                <div className="col-lg-12 col-md-6 col-sm-3 justify-content-center">
                                <img  width={"300px"} height={'200px'} style={imgStyle} src={image} alt="photos"></img> 
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}
