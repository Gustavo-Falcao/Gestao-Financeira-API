using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos.ContaDTOs
{
    public class ContaUpdateRequest
    {
        public string Nome { get; set; } = string.Empty;
        public TipoConta TipoConta { get; set; }
        public decimal SaldoInicial { get; set; }
    }
}