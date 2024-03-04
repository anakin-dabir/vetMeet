import React from 'react'

const Card=( props ) => {
  return (
    <div className="card text-center landing_cards  mx-auto" style={{ width: '20rem' }}>
      <img src={require( `./../../img/${props.img}` )} className="mx-auto" style={{ width: 60 }} alt="flex img" />
      <div className="card-body">
        <h5 className="card-title fw-bold mb-3" style={{ fontSize: 17 }}>{props.heading}</h5>
        <small className="card-text">{props.description}</small>
      </div>
    </div>
  )
}

export default Card