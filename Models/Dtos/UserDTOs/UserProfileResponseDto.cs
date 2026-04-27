using Gestao_Financeira.Models.Dtos.ContaDTOs;

namespace Gestao_Financeira.Models.Dtos.UserDTOs
{
    public class UserProfileResponseDto
    {
        public string Id { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public decimal SaldoTotal { get; set; }
        public List<ContaResponseDto> Contas { get; set ;} = new();
        public List<CategoriaResponseDto> Categorias { get; set; } = new();
        public List<TransacaoResponseDto> Transacoes { get; set ;} = new();
    }
}