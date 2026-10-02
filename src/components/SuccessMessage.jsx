function SuccessMessage({ mensagem }) {
    return (
        <div className="feedback-sucesso" role="status" aria-live="polite">
            {mensagem}
        </div>
    );
}

export default SuccessMessage;