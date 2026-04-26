using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos
{
    public class CategoriaResponseDto
    {
        public string? Id { get; set; }
        public string? Nome { get; set; }
        public TipoMovimentacao TipoMovimentacao { get; set; }
        public string? UsuarioId { get; set; }
    }
}