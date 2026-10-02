import { useEffect, useState } from "react";
import axios from "axios";

import HeaderComponent from "./components/HeaderComponent";
import LoadingComponent from "./components/LoadingComponent";
import UserListComponent from "./components/UserListComponent";
import UserDetailsComponent from "./components/UserDetailsComponent";
import UserFormComponent from "./components/userformComponent";
import ModalComponent from "./components/ModalComponent";
import SuccessMessage from "./components/SuccessMessage";

import "./App.css";

const filtrarUsuarioPorTermo = (termo) => (usuario) => {
    const termoLower = termo.toLowerCase();
    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        (usuario.username || "").toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower)
    );
};

function App() {
    const url = "https://jsonplaceholder.typicode.com";

    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [busca, setBusca] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [modalNovoUsuarioAberto, setModalNovoUsuarioAberto] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState(null);

    const usuariosFiltrados = usuarios.filter(filtrarUsuarioPorTermo(busca));

    async function buscarUsuario(id) {
        try {
            const response = await axios.get(`${url}/users/${id}`);
            setUsuarioSelecionado(response.data);
        } catch (error) {
            console.log("Erro ao buscar usuário: ", error);
        }
    }

    async function buscarUsuarios() {
        try {
            setCarregando(true);
            const response = await axios.get(`${url}/users`);
            setUsuarios(response.data);
        } catch (error) {
            console.log("Erro ao buscar usuários: ", error);
            setErro(`Não foi possível carregar os usuários. Código: ${error.message}`);
            setUsuarios([]);
        } finally {
            setCarregando(false);
        }
    }

    function limparDetalhesUsuario() {
        setUsuarioSelecionado(null);
    }

    function removerUsuario(id) {
        setUsuarios((usuariosAtuais) => usuariosAtuais.filter((usuario) => usuario.id !== id));

        if (usuarioSelecionado && usuarioSelecionado.id === id) {
            setUsuarioSelecionado(null);
        }
    }

    async function cadastrarUsuario(usuario) {
        try {
            const response = await axios.post(`${url}/users`, usuario);
            const data = response.data;

            setUsuarios((usuariosAtuais) => [...usuariosAtuais, data]);
            setMensagemSucesso("Nova conta cadastrada");
            setModalNovoUsuarioAberto(false);

            window.setTimeout(() => {
                setMensagemSucesso(null);
            }, 2400);
        } catch (error) {
            console.log("Erro ao cadastrar usuário: ", error);
        }
    }

    useEffect(() => {
        buscarUsuarios();
    }, []);

    return (
        <div className="app-shell">
            <div className="app">
                <HeaderComponent busca={busca} setBusca={setBusca} />

                <div className="toolbar">
                    <button className="novo-usuario-button" type="button" onClick={() => setModalNovoUsuarioAberto(true)}>
                        Novo Usuário
                    </button>
                </div>

                {mensagemSucesso && <SuccessMessage mensagem={mensagemSucesso} />}

                {carregando && <LoadingComponent />}

                <p className="informacao">Usuários encontrados: {usuarios.length}</p>

                {erro && <p className="erro">{erro}</p>}

                {!carregando && !erro && (
                    <>
                        <p className="informacao">{usuariosFiltrados.length} usuário(s) encontrado(s)</p>

                        {usuariosFiltrados.length > 0 ? (
                            <UserListComponent
                                usuarios={usuariosFiltrados}
                                onSelecionarUsuario={buscarUsuario}
                                onRemoverUsuario={removerUsuario}
                            />
                        ) : (
                            <p className="sem-resultados">Nenhum usuário encontrado.</p>
                        )}
                    </>
                )}

                {usuarioSelecionado && (
                    <ModalComponent onFechar={limparDetalhesUsuario} titulo="Detalhes do usuário">
                        <UserDetailsComponent
                            usuario={usuarioSelecionado}
                            onFecharDetalhes={limparDetalhesUsuario}
                        />
                    </ModalComponent>
                )}

                {modalNovoUsuarioAberto && (
                    <ModalComponent titulo="Cadastrar novo usuário" onFechar={() => setModalNovoUsuarioAberto(false)}>
                        <UserFormComponent
                            onAdicionarUsuario={cadastrarUsuario}
                            onCancelar={() => setModalNovoUsuarioAberto(false)}
                        />
                    </ModalComponent>
                )}
            </div>
        </div>
    );
}

export default App;