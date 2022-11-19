import React from 'react'

function Card(props) {
  return (
    <div className='card'>
        <div className="card-body">
            <img src={props.photo}/>
            <h2 className="card-title">{props.name}</h2>
            <p className="card-description">{props.description}</p>
        </div>
    </div>
  )
}

export default Card