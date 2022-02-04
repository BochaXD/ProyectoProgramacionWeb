import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createEvento,deleteEvento, listEventos,} from '../actions/eventoAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {EVENTOS_CREATE_RESET, EVENTOS_DELETE_RESET,} from '../constants/eventoConstants';

export default function EventoListScreen(props) {
  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const eventoList = useSelector((state) => state.eventoList);
  const { loading, error, eventos, page, pages } = eventoList;
  
  const eventoCreate = useSelector((state) => state.eventoCreate);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    evento: createdEventos,
  } = eventoCreate;

  const eventoDelete = useSelector((state) => state.eventoDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventoDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: EVENTOS_CREATE_RESET });
      props.history.push(`/eventolist/${createdEventos._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: EVENTOS_DELETE_RESET });
    }
    dispatch(
      listEventos({ seller: sellerMode ? userInfo._id : '', pageNumber })
    );
  }, [
    createdEventos,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (evento) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteEvento(evento._id));
    }
  };
  const createHandler = () => {
    dispatch(createEvento());
  };


  
  return (
    <div>
      <div className="row">
        <h1>Evento</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Crear Evento
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titulo </th>
                <th>Categoria</th>
                <th>Tutor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {eventos && eventos.map((e) => (
                <tr key={e._id}>
                  <td>{e._id}</td>
                  <td>{e.name}</td>
                  <td>{e.category}</td>
                  <td>{e.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/evento/${e._id}/edit`)
                      }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(e)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
        </>
      )}
    </div>
  );
}
