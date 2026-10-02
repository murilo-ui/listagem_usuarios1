function ModalComponent({ children, onFechar, titulo }) {
    return (
        <div className="modal-overlay" onClick={onFechar}>
            <div
                className="modal"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <button className="modal-fechar" onClick={onFechar} type="button">
                    ×
                </button>

                {titulo && <h2 className="modal-titulo">{titulo}</h2>}
                {children}
            </div>
        </div>
    );
}

export default ModalComponent;