import React from 'react'
import './sidebox.css'

const SideBox=( props ) => {
  return (
    <div className="side_box">
      <div className="description">
        <img src={require( `./../../img/${props.image}` )} className="img-fluid" alt='fiximg' />
        <div className="side_main_content">
          <p className="heading text-center mx-auto">{props.heading}</p>
          <p className="sub_heading text-center mx-auto">{props.subHeading}</p>
          <img src={require( "./../../img/Group 615.png" )} className="img-fluid pop_img" alt='popImg' />
        </div>
      </div>

    </div>

  )
}

export default SideBox