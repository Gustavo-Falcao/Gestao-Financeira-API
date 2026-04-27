using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Entities
{
    public class Conta (string nome, TipoConta tipoConta, decimal saldoInicial, string usuarioId)
    {
        public string Id { get; private set; } = Guid.NewGuid().ToString("N");
        public string Nome { get; private set; } = nome;
        public TipoConta TipoConta { get; private set; } = tipoConta;
        public decimal SaldoInicial { get; private set; } = saldoInicial;
        public string UsuarioId { get; private set; } = usuarioId;

        public void AlterarNome(string novoNome)
        {
            Nome = novoNome;
        }

        public void AlterarTipoConta(TipoConta novoTipoConta)
        {
            TipoConta = novoTipoConta;
        }

        public void AlterarSaldoInicial(decimal novoSaldoInicial)
        {
            SaldoInicial = novoSaldoInicial;
        }
    }

}