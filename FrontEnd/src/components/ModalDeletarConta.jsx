function ModalDeletarConta({ isOpen, onCancelar, onExcluir }) {

    if(!isOpen) return null
    
    return(
        <div className="modal modal-sm">
        <div className="modal-header">
            <h3>Confirmar exclusão</h3>
            <button className="modal-close" onClick={onCancelar}>✕</button>
        </div>
        <div className="modal-body">
            <p id="confirm-msg">Tem certeza que deseja excluir este item?</p>
        </div>
        <div className="modal-footer">
            <button 
            className="btn-ghost"
            onClick={onCancelar}
            >Cancelar</button>
            <button 
            className="btn-danger" 
            id="confirm-btn"
            onClick={onExcluir}
            >Excluir</button>
        </div>
        </div>
    )
}

export default ModalDeletarConta