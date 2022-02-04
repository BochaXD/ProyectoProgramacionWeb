import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';


export default function Evento(props) {
  const { evento } = props;
  return (
    <div key={evento._id} className="card">
      <Link to={`/evento/${evento._id}`}>
        <img className="medium" src={evento.image} alt={evento.name} />
      </Link>
      <div className="card-body">
        <Link to={`/evento/${evento._id}`}>
          <h2>{evento.name}</h2>
        </Link>
        <Rating
          rating={evento.rating}
          numReviews={evento.numReviews}
        ></Rating>
        <div className="row">
          
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
