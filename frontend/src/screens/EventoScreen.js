import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsEvento } from '../actions/eventoAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { EVENTOS_REVIEW_CREATE_RESET } from '../constants/eventoConstants'


export default function EventoScreen(props) {
  const dispatch = useDispatch();
  const eventoId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const eventoDetails = useSelector((state) => state.eventoDetails);
  const { loading, error, evento } = eventoDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const eventoReviewCreate = useSelector((state) => state.eventoReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = eventoReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: EVENTOS_REVIEW_CREATE_RESET });
    }
    dispatch(detailsEvento(eventoId));
  }, [dispatch, eventoId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${eventoId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(eventoId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={evento.image}
                alt={evento.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{evento.name}</h1>
                </li>
              
                <li>
                  Description:
                  <p>{evento.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    Datos{' '}
                    <h2>
                      <Link to={`/seller/${evento.seller._id}`}>
                        {evento.seller.seller.name}
                      </Link>
                    </h2>
                    
                  </li>
                  <li>
              
                  </li>
                 </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Reviews</h2>
            {evento.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {evento.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Comentario</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Iniciada</option>
                        <option value="2">2- Ini-medio</option>
                        <option value="3">3- Medio</option>
                        <option value="4">4- Medio-fin</option>
                        <option value="5">5- Finalizado</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
