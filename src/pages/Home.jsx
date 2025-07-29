import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://playground.4geeks.com/contact/agendas/andresbouhut/contacts")
      .then(res => res.json())
      .then(data => dispatch({ type: "set_contacts", payload: data.contacts || [] }))
      .catch(console.error);
  }, [dispatch]);

  const handleDelete = (id) => {
    fetch(`https://playground.4geeks.com/contact/agendas/andresbouhut/contacts/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error("Error eliminando");
        dispatch({ type: "delete_contact", payload: id });
      })
      .catch(console.error);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Lista de Contactos</h1>
        <Link to="/add-contact">
          <button className="btn btn-success">Agregar Contacto</button>
        </Link>
      </div>

      <div className="row">
        {store.contacts.map(contact => (
          <div key={contact.id} className="card mb-3 col-12">
            <div className="row g-0 align-items-center">
              <div className="col-auto px-3">
                <img
                  src={contact.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH4skylfJs-mOf6lz4pGDuTMvX6zqPc4LppQ&s"}
                  alt={contact.name || "Contacto"}
                  className="rounded-circle"
                  style={{ width: 60, height: 60, objectFit: "cover" }}
                />
              </div>
              <div className="col">
                <div className="card-body">
                  <h5 className="card-title mb-1">{contact.name || "Sin nombre"}</h5>
                  <p className="card-text mb-0">{contact.address}</p>
                  <p className="card-text mb-0">{contact.phone}</p>
                  <p className="card-text">{contact.email}</p>
                </div>
              </div>
              <div className="col-auto px-3">
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(contact.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(contact.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};