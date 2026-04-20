using GestaoFinanceira.Models.Enuns;

namespace GestaoFinanceira.Models.Entities
{
    public class Conta (string nome, TipoConta tipoConta, decimal saldoInicial, string usuarioId)
    {
        private string Id { get; set; } = Guid.NewGuid().ToString("N");
        private string? Nome { get; set; } = nome;
        private TipoConta TipoConta { get; set; } = tipoConta;
        private decimal SaldoInicial { get; set; } = saldoInicial;
        private string? UsuarioId { get; set; } = usuarioId;
    }
}