import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://playground.4geeks.com/contact/agendas/andresbouhut")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar la agenda");
        return res.json();
      })
      .then((data) => {
        const found = data.contacts.find((c) => c.id === parseInt(id));
        if (!found) throw new Error("Contacto no encontrado");
        setContact({
          name: found.name,
          email: found.email,
          phone: found.phone,
          address: found.address,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://playground.4geeks.com/contact/agendas/andresbouhut/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...contact,
        agenda_slug: "andresbouhut",
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error actualizando el contacto");
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  if (loading) return <p>Cargando contacto...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Editar Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={contact.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={contact.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={contact.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default Edit;