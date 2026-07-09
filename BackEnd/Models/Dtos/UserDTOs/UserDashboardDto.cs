using Gestao_Financeira.Models.Dtos.ContaDTOs;

namespace Gestao_Financeira.Models.Dtos.UserDTOs
{
    public class UserDashboardDto
    {
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal SaldoTotal { get; set; }
        public List<ContaResponseDto> Contas { get; set ;} = new();
        public List<CategoriaResponseDto> Categorias { get; set; } = new();
        public List<TransacaoResponseDto> Transacoes { get; set ;} = new();
    }
}