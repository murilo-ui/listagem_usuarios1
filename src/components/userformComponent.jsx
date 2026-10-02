import React, { useState } from "react";

function UserFormComponent({ onAdicionarUsuario, onCancelar }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nomeBase = formData.name.trim();
    const usernameGerado = nomeBase
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 12) || "shinobi";

    const novoUsuario = {
      id: Date.now(),
      name: nomeBase,
      username: usernameGerado,
      email: formData.email,
      phone: formData.phone || "N/A",
      address: { city: "Não informada" },
      website: "Não informada",
    };

    onAdicionarUsuario(novoUsuario);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Adicionar novo cadastro</h2>

      <label>
        Nome
        <input
          type="text"
          name="name"
          placeholder="Digite o nome completo"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        E-mail
        <input
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Telefone
        <input
          type="tel"
          name="phone"
          placeholder="Digite o telefone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="save-button">
          Confirmar
        </button>
        <button type="button" className="cancel-button" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default UserFormComponent;