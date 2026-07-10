using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos.ContaDTOs
{
    public class ContaResponseDto
    {
        public string Id { get; set; } = string.Empty;
        public string? Nome { get; set; }
        public TipoConta TipoConta { get; set; }
        public decimal SaldoInicial { get; set; }
        public decimal SaldoAtual { get; set; }
        public decimal Movimentacao { get; set; }
        public string? UsuarioId { get; set; }
    }
}