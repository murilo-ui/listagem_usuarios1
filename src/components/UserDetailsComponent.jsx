function UserDetailsComponent({ usuario, onFecharDetalhes }) {
    return (
        <div className="detalhes-usuario">
            <div className="detalhes-header">
                <div className="avatar avatar-grande">{usuario.name?.charAt(0)?.toUpperCase() || "N"}</div>
                <div>
                    <p className="detalhes-label">Perfil shinobi</p>
                    <h2>{usuario.name}</h2>
                </div>
            </div>

            <div className="detalhes-grid">
                <p><strong>Nome:</strong> {usuario.name}</p>
                <p><strong>Usuário:</strong> @{usuario.username || "shinobi"}</p>
                <p><strong>E-mail:</strong> {usuario.email}</p>
                <p><strong>Telefone:</strong> {usuario.phone || "Não informado"}</p>
                <p><strong>Cidade:</strong> {usuario.address?.city || "Não informada"}</p>
                <p><strong>Website:</strong> {usuario.website || "Não informada"}</p>
            </div>

            <button className="fechar-detalhes" onClick={onFecharDetalhes} type="button">
                Fechar detalhes
            </button>
        </div>
    );
}

export default UserDetailsComponent