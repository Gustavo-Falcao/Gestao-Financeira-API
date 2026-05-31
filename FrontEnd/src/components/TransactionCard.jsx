function TransactionCard({ transacao }) {
  return (
    <div className="transaction-card">
      <div>
        <h4>{transacao.descricao}</h4>
      </div>

      <div>
        {transacao.tipoMovimentacao === "Receita"
          ? "+"
          : "-"}
        R$ {transacao.valor}
      </div>
    </div>
  );
}

export default TransactionCard;