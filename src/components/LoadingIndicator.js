import React from 'react'
import loading from '../loading.gif'

const loadingimg= {
  // display : 'block',
  // margin : 'auto',
  width: '80px',
}

const box={
  height:'100vh',
}

const LoadingIndicator = (props) => {
  return  <div className='d-flex justify-content-center align-items-center' style={box}>
           <img style={loadingimg} src={loading} alt="loading" />
          </div>
          }


    // // if (isLoading) {
    //   class LoadingIndicator extends React.Component{
    //     render(){
    //     return (
    //         <div className='d-flex justify-content-center align-items-center' style={box}>
    //           <img style={loadingimg} src={loading} alt="loading" />
    //         </div>
          
    //     )
    //   }
    // }

  
export default LoadingIndicator