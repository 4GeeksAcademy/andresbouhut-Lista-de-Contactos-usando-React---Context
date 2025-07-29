import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const AddContact = () => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.full_name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      agenda_slug: "andresbouhut"
    };

    try {
      const res = await fetch(
        "https://playground.4geeks.com/contact/agendas/andresbouhut/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const data = await res.json();

      dispatch({ type: "add_contact", payload: data });

      alert("Contacto creado exitosamente");
      navigate("/");
    } catch (error) {
      alert(`Error creando el contacto: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">
            Nombre Completo
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            className="form-control"
            value={form.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Contacto
        </button>
      </form>
    </div>
  );
};

export default AddContact;
