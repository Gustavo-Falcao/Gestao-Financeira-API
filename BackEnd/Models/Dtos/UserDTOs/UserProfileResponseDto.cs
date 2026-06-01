using Gestao_Financeira.Models.Dtos.ContaDTOs;
using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos.UserDTOs
{
    public class UserProfileResponseDto
    {
        public string Id { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public UserRole UserRole { get; set; }
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal SaldoTotal { get; set; }
        public List<ContaResponseDto> Contas { get; set ;} = new();
        public List<CategoriaResponseDto> Categorias { get; set; } = new();
        public List<TransacaoResponseDto> Transacoes { get; set ;} = new();
    }
}