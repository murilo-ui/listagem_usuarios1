function UserCardComponent({ usuario, onSelecionarUsuario, onRemoverUsuario }) {
    return (
        <li className="card-usuario">
            <div className="avatar">{usuario.name.charAt(0).toUpperCase()}</div>

            <div className="card-content">
                <h2 className="nome-usuario">{usuario.name}</h2>
                <p className="username">@{usuario.username || "shinobi"}</p>
                <p className="email">{usuario.email}</p>
            </div>

            <div className="card-actions">
                <button
                    className="detalhes-button"
                    onClick={() => onSelecionarUsuario(usuario.id)}
                    type="button"
                >
                    Ver detalhes
                </button>

                <button
                    className="remover-button"
                    onClick={() => onRemoverUsuario(usuario.id)}
                    type="button"
                >
                    Remover
                </button>
            </div>
        </li>
    );
}

export default UserCardComponent;