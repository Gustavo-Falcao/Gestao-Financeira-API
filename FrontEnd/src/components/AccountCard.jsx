function AccountCard({ conta }) {
  return (
    <div className="account-card">
      <h3>{conta.nome}</h3>

      <p>
        Saldo:
        R$ {conta.saldoInicial}
      </p>
    </div>
  );
}

export default AccountCard;